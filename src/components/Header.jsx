import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img src="./src/images/logo.png" alt="logo_img" className="logo" />
      </NavLink>
      <NavBar />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
    transform: scale(3);
    animation: display 1s ease-in-out infinite alternate;
  }

  @keyframes display {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;

export default Header;
