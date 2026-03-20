import axios from "axios";
import fs from "fs";
import path from "path";

const OL_BASE = "https://openlibrary.org";
const HEADERS = { "User-Agent": "Geff.re (api@geff.re)" };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const STOPWORDS = new Set(["a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet", "at", "by", "in", "of", "on", "to", "up", "as"]);

function cleanTitle(str) {
  return str
    .replace(/\[.*?\]/g, "")   // strip [bracketed]
    .replace(/\(.*?\)/g, "")   // strip (parenthesised)
    .replace(/\s*[:\-–—]\s.*$/, "") // strip subtitle after : or dash
    .trim();
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, i, arr) =>
      i === 0 || i === arr.length - 1 || !STOPWORDS.has(word)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(" ");
}

function pickAuthorName(doc) {
  return doc.author_name?.[0] ?? "Unknown author";
}

async function fetchBookData(isbn, customCoverUrl) {
  if (!isbn || typeof isbn !== "string") {
    throw new Error(`ISBN is required. Received: ${isbn}`);
  }

  const metadataDir = path.join(process.cwd(), "src", "assets", "books", "metadata");
  const bookCoversDir = path.join(process.cwd(), "src", "assets", "books", "covers");

  [metadataDir, bookCoversDir].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const cachePath = path.join(metadataDir, `${isbn}.json`);
  const coverImagePath = path.join(bookCoversDir, `${isbn}.jpg`);

  // ── 1. Return from cache if available ─────────────────────────────────────
  if (fs.existsSync(cachePath)) {
    return JSON.parse(fs.readFileSync(cachePath, "utf-8"));
  }

  // ── 2. Add delay to respect rate limits ────────────────────────────────────
  // Open Library allows ~3 requests/sec. We add 500ms to be safe.
  await sleep(500);

  // ── 3. Fetch data ─────────────────────────────────────────────────────────
  const [editionRes, searchRes] = await Promise.all([
    axios.get(`${OL_BASE}/isbn/${isbn}.json`, { headers: HEADERS }),
    axios.get(`${OL_BASE}/search.json`, {
      headers: HEADERS,
      params: {
        isbn,
        fields: "title,author_name,author_alternative_name,cover_i",
        limit: 1,
      },
    }),
  ]);

  const edition = editionRes.data;
  const doc = searchRes.data.docs?.[0];

  if (!edition && !doc) {
    throw new Error(`📚 Book not found for ISBN: ${isbn}`);
  }

  const title = toTitleCase(cleanTitle(edition?.title ?? doc?.title ?? "Unknown title"));
  const author = toTitleCase(pickAuthorName(doc ?? {}));

  // ── 4. Cache cover image ───────────────────────────────────────────────────
  let resolvedCoverPath = customCoverUrl || `/assets/books/covers/${isbn}.jpg`;

  if (!customCoverUrl && !fs.existsSync(coverImagePath)) {
    const coverId = doc?.cover_i ?? edition?.covers?.find((c) => c > 0);
    const remoteUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : null;

    if (remoteUrl) {
      try {
        const coverRes = await axios.get(remoteUrl, {
          responseType: "arraybuffer",
        });
        fs.writeFileSync(coverImagePath, coverRes.data);
      } catch (e) {
        console.warn(`Could not cache cover for ${isbn}: ${e.message}`);
        resolvedCoverPath = remoteUrl; // fall back to remote URL
      }
    } else {
      resolvedCoverPath = null; // no cover available
    }
  }

  const result = { title, author, coverImagePath: resolvedCoverPath };

  // ── 5. Cache metadata ──────────────────────────────────────────────────────
  fs.writeFileSync(cachePath, JSON.stringify(result, null, 2));

  return result;
}

export default fetchBookData;
