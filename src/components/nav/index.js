import React from "react";
import styled from "styled-components";

import weelLogoImage from "../../assets/weel-logo.png";

const NavBar = styled.nav`
  background-color: #ffffff;
  overflow: hidden;
  width: 100%;
  top: 0;
  border-bottom: 1px solid #ccc;
`;

const Logo = styled.img`
  height: 50px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const NavigationBar = () => {
  return (
    <NavBar>
      <Logo src={weelLogoImage} alt="Weel Logo" />
    </NavBar>
  );
};
export default NavigationBar;
