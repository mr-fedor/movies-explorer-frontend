import './Cards.css';
import React from 'react';
import Card from '../Card/Card';

function Cards() {
  return (
    <section className="cards container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

        <div className="cards__more">
            <button className="cards__btn" type="button">Ещё</button>
        </div>
    </section>
  );
}

export default Cards;