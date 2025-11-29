import fs from "fs";
import md from "markdown-it";
import pluginRss from "@11ty/eleventy-plugin-rss";
// import siteData from './src/_data/site.json' with { type: 'json' };

export default function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Custom collection for all content
  eleventyConfig.addCollection("allContent", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/*.md");
  });

  eleventyConfig.addNunjucksShortcode("includeMarkdown", function (filepath) {
    const content = fs.readFileSync(filepath, "utf-8");
    return md().render(content);
  });

  // Add filter for date formatting: "MonthName YYYY"
  eleventyConfig.addFilter("formatDate", function (date) {
    const d = new Date(date);
    const options = { year: "numeric", month: "long" };
    return d.toLocaleDateString("en-US", options);
  });

  eleventyConfig.addFilter("getYear", function (date) {
    return new Date(date).getFullYear();
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
