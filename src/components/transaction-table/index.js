import React, { useState } from "react";
import styled, { css } from "styled-components";

import TransactionStatus from "../transaction-status";
import Dropdown from "../dropdown";

import usefilteredTransactions from "../../hooks//useFilteredTransactions";

const Title = styled.h1`
  font-family: sans-serif;
  font-size: 24px;
  font-weight: 600;
  text-align: left;
`;

const TableContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
  text-align: center;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 16px 8px 16px 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const TableHeaderCell = styled.th`
  padding: 12px 8px 12px 12px;
  border-bottom: 3px solid #ddd;
  text-align: center;
`;
const StyledTableHeaderCell = styled(TableHeaderCell)`
  width: 150px;
`;

const TransactionHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 5px;
`;
const PaginationButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 16px;
`;

const PaginationButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 4px;
  font-size: 14px;
  font-weight: 600;

  ${(props) =>
    props.disabled &&
    css`
      background-color: #6c757d;
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

const TransactionTable = ({ categories, merchants, initialTransactions }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("0");

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const filteredTransactions = usefilteredTransactions(
    transactions,
    merchants,
    categories,
    searchText,
    selectedCategory
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleBillableChange = (transactionId) => {
    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.map((transaction) => {
        if (transaction.id === transactionId) {
          return { ...transaction, billable: !transaction.billable };
        }
        return transaction;
      });
      return updatedTransactions;
    });
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  return (
    <>
      <TransactionHeading>
        <Title>Transactions</Title>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={searchText}
          />
        </SearchContainer>
      </TransactionHeading>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Merchant Name</TableHeaderCell>
              <TableHeaderCell>Team Member</TableHeaderCell>
              <StyledTableHeaderCell>
                <Dropdown
                  options={[
                    { value: "0", label: "Category" },
                    ...categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    })),
                  ]}
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                />
              </StyledTableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>GST</TableHeaderCell>
              <TableHeaderCell>Budget</TableHeaderCell>
              <TableHeaderCell>Receipt</TableHeaderCell>
              <TableHeaderCell>Billable</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTransactions.map((transaction, index) => (
              <TableRow key={index} id={transaction.id}>
                <TableCell>
                  <TransactionStatus status={transaction.status} />
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  {/* if it doesn't match? */}
                  {merchants.find(
                    (merchant) => merchant.id === transaction.merchant
                  )?.name || "unavailable"}
                </TableCell>
                <TableCell>{transaction.team_member}</TableCell>
                <TableCell>
                  {categories.find(
                    (category) => category.id === transaction.category
                  )?.name || "unavailable"}
                </TableCell>
                <TableCell>{`$${transaction.amount}`}</TableCell>
                <TableCell>{`$${transaction.gst}`}</TableCell>
                <TableCell>{transaction.budget}</TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={transaction.receipt}
                    readOnly
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={transaction.billable}
                    onChange={() => {
                      handleBillableChange(transaction.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationButtonGroup>
        <PaginationButton
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || currentTransactions.length === 0}
        >
          Prev
        </PaginationButton>
        <PaginationButton
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage ===
              Math.ceil(filteredTransactions.length / transactionsPerPage) ||
            currentTransactions.length === 0
          }
        >
          Next
        </PaginationButton>
      </PaginationButtonGroup>
    </>
  );
};

export default TransactionTable;
