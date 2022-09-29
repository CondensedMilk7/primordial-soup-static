class DateOrder {
  static byNewest(articles) {
    const ordered = [...articles];
    return ordered.sort((a, b) => {
      return b.data.date.getTime() - a.data.date.getTime();
    });
  }
}

exports.DateOrder = DateOrder;
