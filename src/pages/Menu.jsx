import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Menu = () => {
  return (
    <nav className="navbar">
      <ul className="menu">
      <img src="./assets/filme.png" alt="filme" />
        <li className="menu-item">
          <Link className="menu-link" to="/">DrivenFlex</Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default Menu;
