function extractCitations(bibHtml) {
  let citations = [];
  bibHtml.split("\n").forEach((c) => {
    // Do not include wrapper divs and empty strings (empty lines)
    if (
      c === '<div class="bibliography-contents">' ||
      c === "</div>" ||
      c === ""
    )
      return;
    let citation = c;
    // substitute div tags with p
    citation = citation.replace(/div(?=>|\ class=\")/g, "p");
    // add "reference" class
    citation = citation.replace(/"csl-entry"/g, '"csl-entry reference"');
    citations.push(citation);
  });
  return citations;
}

// Add resource links to citations array using a corresponding
// array of biblatex data. Citation text and bibData must have
// matching indexes in array. By default, the markdown-it-biblatex
// provides bibData in such a manner through env.bib.refs.
function addLinks(citations, bibData) {
  let linked = [];

  citations.forEach((citation, index) => {
    linked.push(citation);
    const bibItem = bibData[index].item;
    const links = [
      scholar(bibItem.title, bibItem.author),
      libgen(bibItem.title, bibItem.author, bibItem.type),
      scihub(bibItem.DOI),
    ];
    // wrap links in a div
    linked.push('  <div class="reference-links">');
    links.forEach((l) => {
      // If scihub returns null for non-existent doi,
      // it should not be rendered. This operation
      // makes sure only truethy values are added to 'linked'
      if (l) {
        linked.push("    " + l);
      }
    });
    linked.push("  </div>");
  });
  return linked;
}

function libgen(title, authors, type) {
  const urlfiedTitle = title.replace(/ /g, "+");
  const urlfiedAuthors = urlAuthors(authors);

  let link = `https://libgen.is/search.php?req=${urlfiedTitle}+${urlfiedAuthors}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=title`;

  if (type === "article-journal") {
    link = `https://libgen.is/scimag/?q=${urlfiedTitle}+${urlfiedAuthors}`;
  }

  return anchor("libgen", "libgen.png", link);
}

function scihub(doi) {
  if (doi) {
    return anchor("sci-hub", "sci-hub.png", "https://sci-hub.se/" + doi);
  } else {
    return null;
  }
}

function scholar(title, authors) {
  const authorsUrlfied = urlAuthors(authors);
  const urlfiedTitle = title.replace(/ /g, "+");
  const link = `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${urlfiedTitle}+${authorsUrlfied}`;

  return anchor("scholar", "scholar.png", link);
}

function anchor(title, icon, link) {
  return `<a class="reference-link" href="${link}" target="_blank"><img src="/assets/icons/${icon}" alt="${title} icon"/><span>${title}</span></a>`;
}

function urlAuthors(authors) {
  let authorNames = "";

  authors.forEach((a, index) => {
    authorNames += index === 0 ? a.family : "+" + a.family;
  });

  return authorNames;
}

module.exports = { scholar, libgen, scihub, extractCitations, addLinks };
