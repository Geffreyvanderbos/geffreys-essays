import pluginRss from "@11ty/eleventy-plugin-rss";
import { execSync } from "node:child_process";
import { DateTime } from "luxon";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import fetchBookData from "./src/_utils/fetchBookData.js";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("formatDate", function (date) {
    const d = new Date(date);
    const options = { year: "numeric", month: "long" };
    return d.toLocaleDateString("en-US", options);
  });

  eleventyConfig.addFilter("getYear", function (date) {
    return new Date(date).getFullYear();
  });

  eleventyConfig.addFilter("stripHtml", function (content) {
    if (!content) return "";

    let html = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gim, "");
    html = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gim, "");
    html = html.replace(/<button\b[^>]*>[\s\S]*?<\/button>/gim, "");
    html = html.replace(/<form\b[^>]*>[\s\S]*?<\/form>/gim, "");
    html = html.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gim, "");
    html = html.replace(/<input[^>]*>/gim, "");
    html = html.replace(/<select\b[^>]*>[\s\S]*?<\/select>/gim, "");
    html = html.replace(/<textarea\b[^>]*>[\s\S]*?<\/textarea>/gim, "");
    html = html.replace(/<label\b[^>]*>[\s\S]*?<\/label>/gim, "");

    let prev;
    do {
      prev = html;
      html = html.replace(/<div\b[^>]*class[^>]*>[\s\S]*?<\/div>/gim, "");
    } while (html !== prev);

    const allowedTags = [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "code",
      "pre",
      "blockquote",
      "em",
      "strong",
      "b",
      "i",
      "a",
      "br",
    ];

    html = html.replace(
      /<(\w+)(\s+[^>]*)?>/gi,
      function (match, tag, attributes) {
        const tagLower = tag.toLowerCase();
        if (allowedTags.includes(tagLower)) {
          // For links, preserve href attribute only
          if (tagLower === "a" && attributes) {
            const hrefMatch = attributes.match(/href=["']([^"']*)["']/i);
            if (hrefMatch) {
              return "<" + tag + ' href="' + hrefMatch[1] + '">';
            }
          }
          return "<" + tag + ">";
        }
        return "";
      },
    );

    html = html.replace(
      /<\/(div|span|section|article|header|footer|nav|aside|main|label)>/gi,
      "",
    );

    return html.trim();
  });

  eleventyConfig.addFilter("hasInteractive", function (content) {
    if (!content) return false;
    const interactivePattern =
      /<script[\s>]|<style[\s>]|<button[\s>]|<input[\s>]|<select[\s>]|<form[\s>]|<textarea[\s>]|<iframe[\s>]|on\w+\s*=/i;
    return interactivePattern.test(content);
  });

  eleventyConfig.addFilter("lastUpdated", (inputPath) => {
    try {
      const result = execSync(`git log -1 --format=%cI "${inputPath}"`, {
        encoding: "utf-8",
      });
      if (!result) return null;
      return new Date(result.trim());
    } catch (e) {
      // Fallback if file not tracked by git or error
      return null;
    }
  });

  eleventyConfig.addFilter("htmlDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISODate(); // yields 2026-01-24
  });

  // Helper to format nicely (e.g., "24 January 2026")
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "d MMMM yyyy",
    );
  });

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig.addShortcode("book", async function (input, customCoverUrl) {
    const isbn =
      typeof input === "string"
        ? input.replace(/-/g, "")
        : String(input).replace(/-/g, "");

    try {
      const bookData = await fetchBookData(isbn, customCoverUrl);
      return `
        <div class="book">
          <div class="book__cover">
            <img width="120" src="${bookData.coverImagePath}" alt="Book Cover" ${customCoverUrl ? 'class="book__cover--custom"' : ""}>
          </div>
          <ul class="book__details no-list-style">
            <li class="book__title">${bookData.title}</li>
            <li class="book__author muted-text">by ${bookData.author}</li>
          </ul>
        </div>
      `;
    } catch (error) {
      return `<p style="display: none;">Ignore me. There's supposed to be a book here. But it errored with the following: ${error.message}</p>`;
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
