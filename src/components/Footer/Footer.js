import './Footer.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer container">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <nav className="footer__nav">
          <ul className="footer__list">
            <li className="footer__item"><Link to="#" className="footer__link">Яндекс.Практикум</Link></li>
            <li className="footer__item"><Link to="#" className="footer__link">Github</Link></li>
            <li className="footer__item"><Link to="#" className="footer__link">Facebook</Link></li>
          </ul>
        </nav>

        <p className="footer__copyright">&copy; 2021</p>
      </div>
    </footer>
  );
}

export default Footer;