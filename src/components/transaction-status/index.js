import React from "react";
import styled from "styled-components";

const TaskStatus = {
  COMPLETE: "complete",
  INCOMPLETE: "incomplete",
  EXPORTED: "exported",
};

const StatusCell = styled.div`
  text-align: center;
  background-color: ${(props) => {
    switch (props.status) {
      case TaskStatus.COMPLETE:
        return "#C8E6C9"; // Light green
      case TaskStatus.EXPORTED:
        return "#BBDEFB"; // Light blue
      case TaskStatus.INCOMPLETE:
        return "#FFF9C4"; // Light yellow
      default:
        return "#E3F2FD"; // Lighter blue
    }
  }};
  color: black;
  border-radius: 40px;
  padding: 5px;
  font-size: 14px;
`;

const TransactionStatus = ({ status }) => {
  return <StatusCell status={status}>{status}</StatusCell>;
};

export default TransactionStatus;
