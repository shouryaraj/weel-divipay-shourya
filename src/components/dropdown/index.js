import React from "react";
import styled from "styled-components";

const StyledDropdown = styled.select`
  font-size: 16px;
  font-weight: 600;
  border: 0;
  text-align: center;
  background-color: #f2f2f2;
  ${(props) => props.customStyles && props.customStyles}
`;

const Dropdown = ({ options, value, onChange = () => {}, customStyles }) => (
  <StyledDropdown onChange={onChange} value={value} customStyles={customStyles}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </StyledDropdown>
);

export default Dropdown;
