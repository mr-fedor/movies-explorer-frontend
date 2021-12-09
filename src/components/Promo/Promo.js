import './Promo.css';
import React from 'react';
import { Link } from 'react-router-dom';
import promo from '../../images/main.svg'; 

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container container">
        <img src={promo} className="promo__img" alt="Учебный проект" />
        <div className="promo__content">
          <h1 className="promo__title">Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.</h1>
          <p className="promo__desc">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
          <Link to="#" className="promo__link">Узнать больше</Link>
        </div>
      </div>
    </section>
  );
}

export default Promo;