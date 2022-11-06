// creates citation of an article from primordialsoup.info
// and copies it to clipboard
function citeArticle(author, date, title, url) {
  const citAuthor = getCitAuthor(author);
  const apaTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

  const citation = `${citAuthor} (${date}). ${apaTitle}. https://primordialsoup.info${url}`;

  navigator.clipboard.writeText(citation).then(
    () => {
      notification("Copied to clipboard:", citation, 2500);
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

function copyUrl(url) {
  const articleUrl = "https://primordialsoup.info" + url;
  navigator.clipboard.writeText(articleUrl).then(
    () => {
      notification("Copied to clipboard:", articleUrl, 2000);
    },
    (err) => {
      console.error("Could not copy citation: ", err);
    }
  );
}

function notification(title, body, duration) {
  const notification = document.querySelector(".notification");
  const notifTitle = document.querySelector(".notification__title");
  const notifBody = document.querySelector(".notification__body");

  notifTitle.textContent = title;
  notifBody.textContent = body;

  setTimeout(() => {
    notification.setAttribute("style", "display: none;");
  }, duration);
  notification.setAttribute("style", "display: block;");
}
