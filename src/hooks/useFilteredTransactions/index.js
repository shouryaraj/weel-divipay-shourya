import { useMemo } from "react";

export const filteredTransactions = (
  transactions,
  merchants,
  categories,
  searchText,
  selectedCategory
) => {
  const lowerCaseSearchText = searchText.toLowerCase();

  return transactions.filter((transaction) => {
    const merchantName = merchants
      .find((merchant) => merchant.id === transaction.merchant)
      ?.name.toLowerCase();
    const categoryName = categories
      .find((category) => category.id === transaction.category)
      ?.name.toLowerCase();

    const matchesSearchText =
      merchantName?.includes(lowerCaseSearchText) ||
      transaction.team_member?.toLowerCase().includes(lowerCaseSearchText) ||
      categoryName?.includes(lowerCaseSearchText) ||
      transaction.budget?.toLowerCase().includes(lowerCaseSearchText) ||
      String(transaction.amount).includes(lowerCaseSearchText) ||
      String(transaction.gst).includes(lowerCaseSearchText);

    const matchesCategory =
      selectedCategory === "0" || transaction.category === selectedCategory;
    return matchesSearchText && matchesCategory;
  });
};

const useFilteredTransactions = (
  transactions,
  merchants,
  categories,
  searchText,
  selectedCategory
) => {
  return useMemo(() => {
    return filteredTransactions(
      transactions,
      merchants,
      categories,
      searchText,
      selectedCategory
    );
  }, [transactions, searchText, selectedCategory]);
};

export default useFilteredTransactions;
