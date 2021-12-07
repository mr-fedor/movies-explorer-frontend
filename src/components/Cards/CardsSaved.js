import './Cards.css';
import React from 'react';
import CardAdded from '../Card/CardAdded';

function CardsSaved() {
  return (
    <section className="cards container">
        <CardAdded />
        <CardAdded />
        <CardAdded />
    </section>
  );
}

export default CardsSaved;