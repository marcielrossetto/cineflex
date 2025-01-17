import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #EE897F;
  padding: 10px 20px;
  height: 90px;
  width: 100%;
  display: flex;
  justify-content: center; 
  align-items: center; 
`;

const Menu = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  max-width: 100%;
`;


const MenuItem = styled.li`
  margin: 0 10px;
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const MenuLink = styled(Link)`
  color: #FADBC5;
  text-decoration: none;
  font-size: 4rem;
  display: flex;
  align-items: center; 
  justify-content: center;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const MenuImage = styled.img`
  height: 50px;
  width: auto;
  margin-right: 10px; 
  display: block;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const MenuComponent = () => {
  return (
    <Navbar>
      <Menu>
        <MenuItem>
          <MenuImage src="/assets/filme.png" alt="filme" />
          <MenuLink to="/">Cine Flex</MenuLink>
        </MenuItem>
      </Menu>
    </Navbar>
  );
};

export default MenuComponent;
