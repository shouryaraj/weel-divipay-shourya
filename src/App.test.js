import React from "react";
import App from "./App";
import { render, within, screen, fireEvent } from "@testing-library/react";
import categoriesData from "./data/categories.json";
import merchantsData from "./data/merchants.json";
import transactionsData from "./data/transactions.json";

const renderApp = ({
  categories = categoriesData,
  merchants = merchantsData,
  transactions = transactionsData,
} = {}) =>
  render(
    <App
      categories={categories}
      merchants={merchants}
      transactions={transactions}
    />
  );

const getRows = (screen) => screen.getAllByRole("row");

describe("Title", () => {
  it("should show title", () => {
    renderApp();

    screen.getByRole("heading", { name: "Transactions" });
  });
});

describe("Table Column", () => {
  describe("status", () => {
    const getStatusCell = (row) => within(row).getAllByRole("cell")[0];
    const getStatusCellInRow = (screen, rowNumber) =>
      getStatusCell(getRows(screen)[rowNumber]);

    it("should show transaction status when it is complete", () => {
      const completeTransaction = transactionsData.find(
        ({ status }) => status === "complete"
      );
      renderApp({ transactions: [completeTransaction] });

      const statusCell = getStatusCellInRow(screen, 1);
      within(statusCell).getByText("complete");
    });

    it("should show transaction status when it is incomplete", () => {
      const incompleteTransaction = transactionsData.find(
        ({ status }) => status === "incomplete"
      );
      renderApp({ transactions: [incompleteTransaction] });

      const statusCell = getStatusCellInRow(screen, 1);
      within(statusCell).getByText("incomplete");
    });
  });

  describe("Merchant Name", () => {
    it("should render the Merchant Name column correctly", () => {
      const getMerchantCell = (row) => within(row).getAllByRole("cell")[2];
      const getMerchantCellInRow = (screen, rowNumber) =>
        getMerchantCell(getRows(screen)[rowNumber]);

      const transactionWithMerchant = {
        ...transactionsData[0],
        merchant: "1",
      };

      const merchant = [
        {
          id: "1",
          name: "Merchant is the king",
        },
        {
          id: "2",
          name: "Merchant is the supreme king",
        },
      ];
      renderApp({
        transactions: [transactionWithMerchant],
        merchants: merchant,
      });

      const merchantCell = getMerchantCellInRow(screen, 1);

      within(merchantCell).getByText("Merchant is the king");
    });
  });

  describe("Team member", () => {
    const getTeamMemberCell = (row) => within(row).getAllByRole("cell")[3];
    const getTeamMemberInRow = (screen, rowNumber) =>
      getTeamMemberCell(getRows(screen)[rowNumber]);

    it("should render the Team Member column correctly", () => {
      const transactionWithTeamMember = {
        ...transactionsData[0],
        team_member: "John Doe",
      };
      renderApp({ transactions: [transactionWithTeamMember] });

      const teamMemberCell = getTeamMemberInRow(screen, 1);

      within(teamMemberCell).getByText("John Doe");
    });
  });

  describe("Category", () => {
    it("should render the Categories column correctly", () => {
      const getCategoryCell = (row) => within(row).getAllByRole("cell")[4];
      const getCategoryCellInRow = (screen, rowNumber) =>
        getCategoryCell(getRows(screen)[rowNumber]);

      const transactionWithCategory = {
        ...transactionsData[0],
        category: "1",
      };

      const categories = [
        {
          id: "1",
          name: "Category 1",
        },
        {
          id: "2",
          name: "Category 2",
        },
      ];

      renderApp({ transactions: [transactionWithCategory], categories });

      const categoryCell = getCategoryCellInRow(screen, 1);

      within(categoryCell).getByText("Category 1");
    });
  });

  describe("Receipt", () => {
    const getReceiptCell = (row) => within(row).getAllByRole("cell")[8];
    const getReceiptCellInRow = (screen, rowNumber) =>
      getReceiptCell(getRows(screen)[rowNumber]);

    const transactionWithCategory = {
      ...transactionsData[0],
      category: "1",
      receipt: true,
    };

    const categories = [
      {
        id: "1",
        name: "Category 1",
      },
      {
        id: "2",
        name: "Category 2",
      },
    ];

    it("should render the Receipt column correctly", () => {
      renderApp({ transactions: [transactionWithCategory], categories });

      const receiptCell = getReceiptCellInRow(screen, 1);
      const receiptInput = within(receiptCell).getByRole("checkbox");

      expect(receiptInput.readOnly).toBe(true);
      expect(receiptInput.checked).toBe(true);
    });
  });

  describe("Billable", () => {
    const getBillableCell = (row) => within(row).getAllByRole("cell")[9];
    const getBillableCellInRow = (screen, rowNumber) =>
      getBillableCell(getRows(screen)[rowNumber]);

    const transactionWithCategory = {
      ...transactionsData[0],
      category: "1",
      billable: true,
    };

    const categories = [
      {
        id: "1",
        name: "Category 1",
      },
      {
        id: "2",
        name: "Category 2",
      },
    ];

    it("should render the Receipt column correctly", () => {
      renderApp({ transactions: [transactionWithCategory], categories });

      const billableCell = getBillableCellInRow(screen, 1);
      const billabletInput = within(billableCell).getByRole("checkbox");

      expect(billabletInput.readOnly).toBe(false);
      expect(billabletInput.checked).toBe(true);
    });

    it("should toggle the billable status when clicked", () => {
      renderApp({ transactions: [transactionWithCategory], categories });

      const billableCell = getBillableCellInRow(screen, 1);
      const billabletInput = within(billableCell).getByRole("checkbox");

      expect(billabletInput.checked).toBe(true);

      fireEvent.click(billabletInput);

      expect(billabletInput.checked).toBe(false);
    });
  });
});

describe("Search funtionality", () => {
  it("should filter transactions based on search text for team member", () => {
    const getTeamMemberCell = (row) => within(row).getAllByRole("cell")[3];
    const getTeamMemberInRow = (screen, rowNumber) =>
      getTeamMemberCell(getRows(screen)[rowNumber]);

    renderApp();

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "John Mendoza" } });

    const merchantCell = getTeamMemberInRow(screen, 1);

    within(merchantCell).getByText("John Mendoza");
  });

  it("should filter transactions based on search text for Merchant Name", () => {
    const getMerchantCell = (row) => within(row).getAllByRole("cell")[2];

    renderApp();

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "facebook" } });
    getRows(screen).forEach((row, index) => {
      if (index == 0) return;
      const merchantCell = getMerchantCell(row);

      within(merchantCell).getByText("Facebook");
    });
  });

  //Unhappy path
  it("should not show transactions based on search text for team member if it is not present", () => {
    const getTeamMemberCell = (row) => within(row).getAllByRole("cell")[3];
    const getTeamMemberInRow = (screen, rowNumber) =>
      getTeamMemberCell(getRows(screen)[rowNumber]);

    renderApp();

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "dfklhgasfughaig" } });

    const rows = getRows(screen);

    // Header counts 1
    expect(rows.length).toBe(1);
  });
});
