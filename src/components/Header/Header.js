import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header header_dark">
      <div className="header__container container">
        <Link className="header__logo" to="/"></Link>
        <div className="header__menu-login">
          <Link className="header__link header__link_color_white header__link_type_signup" to="/signup">Регистрация</Link>
          <Link className="header__link header__link_type_signin" to="/signin">Войти</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;