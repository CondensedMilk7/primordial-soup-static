import { DateTime } from "luxon";
import { libgen, scihub, scholar } from "./lib/resource-link";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/styles");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/scripts");
  eleventyConfig.addPassthroughCopy("./src/admin");

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("libgen", (reference) => libgen(reference));
  eleventyConfig.addFilter("scihub", (reference) => scihub(reference));
  eleventyConfig.addFilter("scholar", (reference) => scholar(reference));

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
}
