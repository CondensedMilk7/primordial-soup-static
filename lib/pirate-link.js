function libgen(reference) {
  const title = getTitle(reference);
  const urlfiedTitle = title.replaceAll(" ", "+");
  const firstAuthor = getFirstAuthor(reference);

  // If it's from an article
  if (
    reference.toLowerCase().includes("journal") ||
    reference.toLowerCase().includes("magazine")
  ) {
    return `https://libgen.is/scimag/?q=${urlfiedTitle}+${firstAuthor}`;
  } else {
    // Otherwise look for non-fiction (book?)
    return `https://libgen.is/search.php?req=${urlfiedTitle}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=title`;
  }
}

function scihub(reference) {
  const doi = getDOI(reference);
  if (doi) {
    return "https://sci-hub.se/" + doi;
  } else {
    return null;
  }
}

function getFirstAuthor(reference) {
  return reference.split(",")[0];
}

function getTitle(reference) {
  return reference.split("). ")[1].split(".")[0];
}

function getDOI(reference) {
  const doiBase = "https://doi.org/";
  if (reference.includes(doiBase)) {
    return doiBase + reference.split(doiBase)[1];
  } else {
    return null;
  }
}

exports.libgen = libgen;
exports.scihub = scihub;
