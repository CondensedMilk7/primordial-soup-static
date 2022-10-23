class ResourceLink {
  static libgen(reference) {
    const title = this.getTitle(reference);
    const urlfiedTitle = title.replace(/ /g, "+");
    const firstAuthor = this.getFirstAuthor(reference);

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

  static scihub(reference) {
    const doi = this.getDOI(reference);
    if (doi) {
      return "https://sci-hub.se/" + doi;
    } else {
      return null;
    }
  }

  static scholar(reference) {
    const title = this.getTitle(reference);
    const allAuthors = this.getAllAuthors(reference);
    const authorsUrlfied = allAuthors.replace(/ /g, "+").replace(/&/g, "");
    const urlfiedTitle = title.replace(/ /g, "+");

    return `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${urlfiedTitle}+${authorsUrlfied}`;
  }

  static getFirstAuthor(reference) {
    return reference.split(",")[0];
  }

  static getAllAuthors(reference) {
    return reference.split(". (")[0] + ".";
  }

  static getTitle(reference) {
    return reference.split("). ")[1].split(".")[0];
  }

  static getDOI(reference) {
    const doiBase = "https://doi.org/";
    if (reference.includes(doiBase)) {
      return doiBase + reference.split(doiBase)[1];
    } else {
      return null;
    }
  }

  static refsExist(references) {
    return references.length;
  }
}

exports.ResourceLink = ResourceLink;
