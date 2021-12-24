import './Header.css';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header(props) {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  return (
    <header className={`header ${props.isDark ? 'header_dark' : ''}`}>
      <div className="header__container container">
        <Link className="logo" to="/"></Link>
        { props.loggedIn ? 
          <nav className="header__nav header__nav_screen_desktop">
            <ul className="header__list header__list_screen_desktop">
              <li className="header__item header__item_screen_desktop">
                <NavLink to="/movies" className={`header__link ${props.isDark ? 'header__link_color_white' : ''}`} activeClassName='header__link_active'>Фильмы</NavLink>
              </li>
              <li className="header__item header__item_screen_desktop">
                <NavLink to="/saved-movies" className={`header__link ${props.isDark ? 'header__link_color_white' : ''}`} activeClassName='header__link_active'>Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </nav>
          : ''
        }

        { !props.loggedIn ? 
          <div className="header__menu-login">
            <Link className={`header__link header__link_type_signup ${props.isDark ? 'header__link_color_white' : ''}`} to="/signup">Регистрация</Link>
            <Link className="header__link header__link_type_signin" to="/signin">Войти</Link>
          </div>
          :
          <> 
            <Link className="header__link header__link_type_account header__link_screen_desktop-flex" to="/profile">Аккаунт</Link>
            <button className={`header__hamburger ${props.isDark ? 'header__hamburger_white' : '' }`} type="button" onClick={() => {setIsOpenMenu(!isOpenMenu)}}></button>  
          </>
        }
      </div>

      { props.loggedIn ?
        <div className={`header__mobile ${isOpenMenu === true ? 'header__mobile_active' : ''}`}>
          <div className="header__mobile-container">
            <button className="header__close" onClick={() => {setIsOpenMenu(!isOpenMenu)}}></button>

            <nav className="header__nav header__nav_screen_mobile">
              <ul className="header__list header__list_screen_mobile">
                <li className="header__item header__item_screen_mobile">
                  <NavLink exact to="/" className="header__link header__link_type_nav" activeClassName="header__link_active">Главная</NavLink>
                </li>
                <li className="header__item header__item_screen_mobile">
                  <NavLink to="/movies" className="header__link header__link_type_nav" activeClassName="header__link_active">Фильмы</NavLink>
                </li>
                <li className="header__item header__item_mobile">
                  <NavLink to="/saved-movies" className="header__link header__link_type_nav" activeClassName="header__link_active">Сохранённые фильмы</NavLink>
                </li>
              </ul>
            </nav>

            <Link className="header__link header__link_type_account" to="/profile">Аккаунт</Link>
          </div>
        </div>
        : ''}
    </header>
  );
}

export default Header;