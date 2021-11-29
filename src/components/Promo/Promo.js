import './Promo.css';
import React from 'react';
import { Link } from 'react-router-dom';
import promo from '../../images/main.svg'; 

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container container">
        <img src={promo} className="promo__img" />
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__desc">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <Link className="promo__link" to="/">Узнать больше</Link>
      </div>
    </section>
  );
}

export default Promo;