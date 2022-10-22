const { DateTime } = require("luxon");
const { ResourceLink } = require("./src/lib/resource-link-legacy");
const { extractCitations, addLinks } = require("./src/lib/resource-link");
const { DateOrder } = require("./src/lib/date-order");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const configureMdBiblatex = require("./config/md-biblatex");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/scripts");
  eleventyConfig.addPassthroughCopy("./src/admin");

  eleventyConfig.addCollection("articlesByNewest", (collectionApi) => {
    const articles = collectionApi.getFilteredByTag("article");
    return DateOrder.byNewest(articles);
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("byNewest", (articles) =>
    DateOrder.byNewest(articles)
  );

  // Legacy resource link generators
  // for older articles that don't use biblatex
  eleventyConfig.addFilter("libgen", (reference) =>
    ResourceLink.libgen(reference)
  );
  eleventyConfig.addFilter("scihub", (reference) =>
    ResourceLink.scihub(reference)
  );
  eleventyConfig.addFilter("scholar", (reference) =>
    ResourceLink.scholar(reference)
  );

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPlugin(pluginRss);

  const md = markdownIt();
  // New resource link generator
  configureMdBiblatex(md);
  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
