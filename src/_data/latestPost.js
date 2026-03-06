import Parser from "rss-parser";

export default async function () {
  const parser = new Parser();
  const url = "https://id.geff.re/@geffrey/feed.rss";

  try {
    const feed = await parser.parseURL(url);
    if (!feed.items || feed.items.length === 0) {
      console.warn("RSS feed fetched but no items found.");
      return fallbackData();
    }

    const latest = feed.items[0];
    let content =
      latest["content:encoded"] || latest.content || latest.description || "";

    const hasImage =
      /<img\b[^>]*>/i.test(content) ||
      (latest.enclosure &&
        latest.enclosure.type &&
        latest.enclosure.type.startsWith("image"));

    const hasVideo =
      /<video\b[^>]*>/i.test(content) ||
      (latest.enclosure &&
        latest.enclosure.type &&
        latest.enclosure.type.startsWith("video"));

    content = content.replace(/<img\b[^>]*>/gi, "");
    content = content.replace(/<video\b[^>]*>[\s\S]*?<\/video>/gi, "");

    content = content.replace(
      /<a\b[^>]*class="[^"]*hashtag[^"]*"[^>]*>([\s\S]*?)<\/a>/gi,
      (match, innerText) => {
        return innerText.replace(/<[^>]+>/g, "");
      },
    );

    content = content.replace(
      /<a\b([^>]*)>([\s\S]*?)<\/a>/gi,
      (match, attributes, innerText) => {
        const maxLen = 30;
        let newText = innerText;

        if (newText.length > maxLen) {
          newText = newText.substring(0, maxLen) + "…";
        }

        return `<a ${attributes}>${newText}</a>`;
      },
    );

    return {
      content: content,
      date: new Date(latest.isoDate || new Date().toISOString()),
      url: latest.link,
      hasImage: hasImage,
      hasVideo: hasVideo,
    };
  } catch (e) {
    console.error("Failed to fetch RSS feed:", e.message);
    return fallbackData();
  }
}

function fallbackData() {
  return {
    content: "Check out my latest updates on the Fediverse!",
    date: new Date().toISOString(),
    url: "https://id.geff.re/@geffrey",
    hasImage: false,
  };
}
