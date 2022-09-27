const { DateOrder } = require("../src/lib/date-order");
describe("Date Order Filter", () => {
  it("Should sort array of objects by date", () => {
    const array = [
      {
        title: "third",
        data: {
          date: new Date("11.22.2021"),
        },
      },
      {
        title: "first",
        data: {
          date: new Date("03.12.2022"),
        },
      },
      {
        title: "second",
        data: {
          date: new Date("12.13.2021"),
        },
      },
    ];

    const expected = [
      {
        title: "first",
        data: {
          date: new Date("03.12.2022"),
        },
      },
      {
        title: "second",
        data: {
          date: new Date("12.13.2021"),
        },
      },
      {
        title: "third",
        data: {
          date: new Date("11.22.2021"),
        },
      },
    ];

    const sorted = DateOrder.byNewest(array);

    expect(sorted).toEqual(expected);
  });
});
