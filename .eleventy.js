const { DateTime } = require("luxon");
const { ResourceLink } = require("./src/lib/resource-link");
const { DateOrder } = require("./src/lib/date-order");

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

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
