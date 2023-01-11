const mdBiblatex = require("@arothuis/markdown-it-biblatex");
const { extractCitations, addLinks } = require("../src/lib/resource-link");

function setupMdBiblatex(md) {
  md.use(mdBiblatex, {
    bibPath: "./bibliography.bib",
    // Hacky...
    bibliographyTitle: '<a href="#references" id="references">References</a>',
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
    // Can be used to access bibliography data.
    // Currently not being used.
    // let bibData = [];
    // env.bib.refs.forEach((r) => {
    //   bibData.push(r.citation.citationItems[0]);
    // });

    const citations = extractCitations(bibHtml);
    const linked = addLinks(citations);

    // Additional new line at the end because the closing function
    // of the library doesn't add it before the closing div.
    return linked.join("\n") + "\n";
  };
}

module.exports = setupMdBiblatex;
