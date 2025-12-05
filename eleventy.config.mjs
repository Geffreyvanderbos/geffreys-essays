import fs from "fs";
import md from "markdown-it";
import pluginRss from "@11ty/eleventy-plugin-rss";
// import siteData from './src/_data/site.json' with { type: 'json' };

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addCollection("allContent", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/*.md");
  });

  eleventyConfig.addNunjucksShortcode("includeMarkdown", function (filepath) {
    const content = fs.readFileSync(filepath, "utf-8");
    return md().render(content);
  });

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

    for (let i = 0; i < 5; i++) {
      html = html.replace(/<div\b[^>]*class[^>]*>[\s\S]*?<\/div>/gim, "");
    }

    const allowedTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
      'code', 'pre', 'blockquote', 'em', 'strong', 'b', 'i', 'a', 'br'];

    html = html.replace(/<(\w+)(\s+[^>]*)?>/gi, function (match, tag, attributes) {
      const tagLower = tag.toLowerCase();
      if (allowedTags.includes(tagLower)) {
        // For links, preserve href attribute only
        if (tagLower === 'a' && attributes) {
          const hrefMatch = attributes.match(/href=["']([^"']*)["']/i);
          if (hrefMatch) {
            return '<' + tag + ' href="' + hrefMatch[1] + '">';
          }
        }
        return '<' + tag + '>';
      }
      return '';
    });

    html = html.replace(/<\/(div|span|section|article|header|footer|nav|aside|main|label)>/gi, '');

    return html.trim();
  });

  eleventyConfig.addFilter("hasInteractive", function (content) {
    if (!content) return false;
    const interactivePattern =
      /<script[\s>]|<style[\s>]|<button[\s>]|<input[\s>]|<select[\s>]|<form[\s>]|<textarea[\s>]|<iframe[\s>]|on\w+\s*=/i;
    return interactivePattern.test(content);
  });

  eleventyConfig.addPlugin(pluginRss);

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
