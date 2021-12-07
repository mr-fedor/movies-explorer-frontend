import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLogin() {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  
  return (
    <header className="header">
      <div className="header__container container">
        <Link className="logo" to="/"></Link>
        <nav className="header__nav header__nav_screen_desktop">
          <ul className="header__list header__list_screen_desktop">
            <li className="header__item header__item_screen_desktop">
              <Link to="/movies" className="header__link header__link_active">Фильмы</Link>
            </li>
            <li className="header__item header__item_screen_desktop">
              <Link to="/saved-movies" className="header__link header__link_desktop">Сохранённые фильмы</Link>
            </li>
          </ul>
        </nav>

        <Link className="header__link header__link_type_account header__link_screen_desktop-flex" to="/profile">Аккаунт</Link>
        <button className="header__hamburger" type="button" onClick={() => {setIsOpenMenu(!isOpenMenu)}}></button>
      </div>

      <div className={`header__mobile ${isOpenMenu === true ? 'header__mobile_active' : ''}`}>
        <div className="header__mobile-container">
          <button className="header__close" onClick={() => {setIsOpenMenu(!isOpenMenu)}}></button>

          <nav className="header__nav header__nav_screen_mobile">
            <ul className="header__list header__list_screen_mobile">
              <li className="header__item header__item_screen_mobile">
                <Link to="/" className="header__link header__link_type_nav">Главная</Link>
              </li>
              <li className="header__item header__item_screen_mobile">
                <Link to="/movies" className="header__link header__link_active header__link_type_nav">Фильмы</Link>
              </li>
              <li className="header__item header__item_mobile">
                <Link to="/saved-movies" className="header__link header__link_type_nav">Сохранённые фильмы</Link>
              </li>
            </ul>
          </nav>

          <Link className="header__link header__link_type_account" to="/profile">Аккаунт</Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderLogin;