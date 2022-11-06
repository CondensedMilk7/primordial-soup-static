// creates citation of an article from primordialsoup.info
// and copies it to clipboard
function citeArticle(author, date, title) {
  const citAuthor = getCitAuthor(author);
  const apaTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

  const citation = `${citAuthor} (${date}). ${apaTitle}. www.primordialsoup.info.`;

  navigator.clipboard.writeText(citation).then(
    () => {
      console.log("copied: " + citation);
    },
    (err) => {
      console.error("Could not copy citation: ", err);
    }
  );

  function getCitAuthor(author) {
    const authorArr = author.split(" ");
    const firstname = authorArr[0];
    const surname = authorArr[authorArr.length - 1];
    const middlename = authorArr.length > 2 ? authorArr[1] : null;
    let citName;
    if (middlename) {
      citName = `${surname}, ${firstname[0]}. ${
        middlename.includes(".") ? middlename : middlename[0] + "."
      }`;
    } else {
      citName = `${surname}, ${firstname[0]}.`;
    }
    return citName;
  }
}
