import React from "react";
import styled from "styled-components";

import NavigationBar from "./components/nav";
import TransactionTable from "./components/transaction-table";

const PageContainer = styled.div`
  max-width: 1200px;
  padding: 24px;
  margin: 0 auto;
`;

const App = ({ categories, merchants, transactions }) => {
  return (
    <PageContainer>
      <NavigationBar />
      <TransactionTable
        categories={categories}
        merchants={merchants}
        initialTransactions={transactions}
      />
    </PageContainer>
  );
};

export default App;
