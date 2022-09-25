class DateOrder {
  static byNewest(articles) {
    const ordered = [...articles];
    ordered.sort((a, b) => {
      const dateA = new Date(a.data.date);
      const dateB = new Date(b.data.date);
      return dateA < dateB;
    });
    console.log(dateA);
    return ordered;
  }
}

exports.DateOrder = DateOrder;
