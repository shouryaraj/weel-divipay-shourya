import { filteredTransactions } from "./";

describe("filteredTransactions", () => {
  const transactions = [
    {
      id: "4ca91d14-232c-493d-9b89-725b3a726a21",
      status: "complete",
      date: "2019-04-15T07:37:38",
      merchant: "c20b237a-da94-40cd-b85f-6a359b656929",
      team_member: "Casey Tran",
      budget: "Sales Team",
      receipt: false,
      billable: false,
      gst: 653.54,
      amount: 7189,
      category: "123",
    },
    {
      id: "2eba5cfd-8696-458e-a3a4-f1f8823fec71",
      status: "exported",
      date: "2019-05-23T20:35:58",
      merchant: "30650d28-8ebf-454d-940b-27f7518b4550",
      team_member: "Angela Sawyer",
      budget: "Marketing Team",
      receipt: false,
      billable: true,
      gst: 453,
      amount: 4983,
      category: "9ea558c4-666b-493f-b801-c0c1c8b259cd",
    },
  ];
  const merchants = [
    { id: "4ca91d14-232c-493d-9b89-725b3a726a21", name: "Merchant 1" },
    { id: "2eba5cfd-8696-458e-a3a4-f1f8823fec71", name: "Merchant 2" },
  ];
  const categories = [
    { id: "9ea558c4-666b-493f-b801-c0c1c8b259cd", name: "Category 1" },
  ];
  const searchText = "Casey";
  const selectedCategory = "0";

  it("should filter transactions based on searched text", () => {
    const result = filteredTransactions(
      transactions,
      merchants,
      categories,
      searchText,
      selectedCategory
    );

    expect(result).toHaveLength(1);
    expect(result[0].team_member).toBe("Casey Tran");
  });

  it("should filter transactions based on category", () => {
    const selectedCategory = "9ea558c4-666b-493f-b801-c0c1c8b259cd";
    const searchText = "";
    const result = filteredTransactions(
      transactions,
      merchants,
      categories,
      searchText,
      selectedCategory
    );

    expect(result).toHaveLength(1);
    expect(result[0].team_member).toBe("Angela Sawyer");
  });
});
