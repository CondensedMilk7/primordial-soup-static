const { DateTime } = require("luxon");
const { ResourceLink } = require("./src/lib/resource-link-legacy");
const { extractCitations, addLinks } = require("./src/lib/resource-link");
const { DateOrder } = require("./src/lib/date-order");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const mdBiblatex = require("@arothuis/markdown-it-biblatex");

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

  // New resource link generator
  const md = markdownIt();
  md.use(mdBiblatex, {
    bibPath: "./example.bib",
  });

  const defaultRenderer =
    md.renderer.rules.biblatex_bibliography_contents ||
    function (tokens, idx, options, env, slf) {
      return slf.renderToken(tokens, idx, options, env);
    };

  md.renderer.rules.biblatex_bibliography_contents = function (
    tokens,
    idx,
    options,
    env
  ) {
    const bibHtml = defaultRenderer(tokens, idx, options, env);

    let bibData = [];
    env.bib.refs.forEach((r) => {
      bibData.push(r.citation.citationItems[0]);
    });

    const citations = extractCitations(bibHtml);
    const linked = addLinks(citations, bibData);

    // Additional new line at the end because the closing function
    // of the library doesn't add it before the closing div.
    return linked.join("\n") + "\n";
  };

  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
