const rl = require("../src/lib/resource-link");
const { readFileSync } = require("fs");
const { join } = require("path");

function fixture(fileName) {
  return readFileSync(join(__dirname, "fixtures", fileName), "utf-8");
}

const citations = [
  '<p class="csl-entry reference">Freud, S. (2013). <i>The Ego and the Id</i>. W.W. Norton Company (NY).</p>',
  '<p class="csl-entry reference">Goldie, P. (2002). <i>The Emotions: A Philosophical Exploration</i>. Oxford University Press.</p>',
  '<p class="csl-entry reference">Lacan, J. (2014). <i>Seminar VII: The ethics of psychoanalysis</i>. London: W. W. Norton &#38; Company.</p>',
];

describe("Resource Link", () => {
  it("Should extract citations into array with substituted divs with p and added reference class", () => {
    bibHtml = fixture("bibliography-initial.html");
    const result = rl.extractCitations(bibHtml);
    expect(result).toEqual(citations);
  });
});

// TODO: finish writing tests.
// describe("Extracts DOI", () => {
//   const result = getDoi(citations[0]);
// });
