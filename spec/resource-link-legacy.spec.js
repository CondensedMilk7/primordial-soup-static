const { ResourceLink } = require("../src/lib/resource-link-legacy");

describe("Resource Link Legacy", () => {
  const reference =
    "Murray, D. J., Ellis, R. R., Bandomir, C. A., & Ross, H. E. (1991). charpentier (1891) on size-weight illusion. Perception & Psychophysics, 61 (8), 1681–1685. https://doi.org/10.3758/BF03213127";

  it("Should get all author names", () => {
    const authors = ResourceLink.getAllAuthors(reference);

    expect(authors).toEqual(
      "Murray, D. J., Ellis, R. R., Bandomir, C. A., & Ross, H. E."
    );
  });

  it("Should get the title", () => {
    const title = ResourceLink.getTitle(reference);
    expect(title).toBe("charpentier (1891) on size-weight illusion");
  });

  it("Should get DOI", () => {
    const doi = ResourceLink.getDOI(reference);
    expect(doi).toEqual("https://doi.org/10.3758/BF03213127");
  });
});
