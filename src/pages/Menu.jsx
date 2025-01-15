import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #EE897F;
  padding: 10px 20px;
  height: 90px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between; /* Ajusta o conteúdo para se espalhar */
  align-items: center;
`;

const Menu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Permite que os itens se ajustem em telas menores */
`;

const MenuItem = styled.li`
  margin: 0 15px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const MenuLink = styled(Link)`
  color: #FADBC5;
  text-decoration: none;
  font-size: 2rem; /* Usando unidades relativas */
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Reduz o tamanho da fonte em telas menores */
  }
`;

const MenuImage = styled.img`
  height: 50px;
  width: auto;
  vertical-align: middle;
  margin-right: 15px;

  @media (max-width: 768px) {
    height: 40px; /* Ajusta a altura da imagem para telas menores */
  }
`;

const MenuComponent = () => {
  return (
    <Navbar>
      <Menu>
        <MenuImage src="/assets/filme.png" alt="filme" />
        <MenuItem>
          <MenuLink to="/">DrivenFlex</MenuLink>
        </MenuItem>
      </Menu>
    </Navbar>
  );
};

export default MenuComponent;
