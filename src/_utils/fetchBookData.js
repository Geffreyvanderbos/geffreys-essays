import fs from "fs";
import path from "path";

const memCache = new Map();

const OL_BASE = "https://openlibrary.org";
const GB_BASE = "https://www.googleapis.com/books/v1";
const HEADERS = { "User-Agent": "Geff.re (api@geff.re)" };
const TIMEOUT = 5000;

const STOPWORDS = new Set(["a", "an", "the", "and", "but", "or", "nor", "for", "so", "yet", "at", "by", "in", "of", "on", "to", "up", "as"]);

function cleanTitle(str) {
  return str
    .replace(/\[.*?\]/g, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\s*[:\-–—]\s.*$/, "")
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

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { headers: HEADERS, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
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

  // ── 1. Return from cache ───────────────────────────────────────────────────
  if (memCache.has(isbn)) {
    const cached = memCache.get(isbn);
    if (cached === null) throw new Error(`Skipping ${isbn} — previously failed this build`);
    return cached;
  }

  if (fs.existsSync(cachePath)) {
    const result = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
    memCache.set(isbn, result);
    return result;
  }

  // ── 2. Fetch data (Google Books first, OpenLibrary fallback) ──────────────
  let title, author, pages, remoteCoverUrl;

  try {
    const gbData = await fetchWithTimeout(`${GB_BASE}/volumes?q=isbn:${isbn}`);
    const info = gbData.items?.[0]?.volumeInfo;

    if (info) {
      title = toTitleCase(cleanTitle(info.title ?? "Unknown title"));
      author = toTitleCase(info.authors?.[0] ?? "Unknown author");
      pages = info.pageCount ?? null;
      const thumb = info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail;
      remoteCoverUrl = thumb ? thumb.replace(/^http:/, "https:") : null;
    }
  } catch (e) {
    console.warn(`📚 Google Books failed for ${isbn}: ${e.message} — trying OpenLibrary`);
  }

  if (!title) {
    try {
      const [edition, searchData] = await Promise.all([
        fetchWithTimeout(`${OL_BASE}/isbn/${isbn}.json`),
        fetchWithTimeout(`${OL_BASE}/search.json?isbn=${isbn}&fields=title,author_name,cover_i&limit=1`),
      ]);
      const doc = searchData.docs?.[0];

      if (!edition && !doc) throw new Error(`Book not found for ISBN: ${isbn}`);

      title = toTitleCase(cleanTitle(edition?.title ?? doc?.title ?? "Unknown title"));
      author = toTitleCase(pickAuthorName(doc ?? {}));
      pages = edition?.number_of_pages ?? null;
      const coverId = doc?.cover_i ?? edition?.covers?.find((c) => c > 0);
      remoteCoverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
    } catch (e) {
      memCache.set(isbn, null);
      throw e;
    }
  }

  // ── 3. Cache cover image ───────────────────────────────────────────────────
  let resolvedCoverPath = customCoverUrl || `/assets/books/covers/${isbn}.jpg`;

  if (!customCoverUrl && !fs.existsSync(coverImagePath)) {
    if (remoteCoverUrl) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT);
        const coverRes = await fetch(remoteCoverUrl, { signal: controller.signal });
        clearTimeout(timer);
        const buffer = await coverRes.arrayBuffer();
        fs.writeFileSync(coverImagePath, Buffer.from(buffer));
      } catch (e) {
        console.warn(`Could not cache cover for ${isbn}: ${e.message}`);
        resolvedCoverPath = remoteCoverUrl;
      }
    } else {
      resolvedCoverPath = null;
    }
  }

  const result = { title, author, pages, coverImagePath: resolvedCoverPath };

  // ── 4. Cache metadata ──────────────────────────────────────────────────────
  fs.writeFileSync(cachePath, JSON.stringify(result, null, 2));
  memCache.set(isbn, result);

  return result;
}

export default fetchBookData;
