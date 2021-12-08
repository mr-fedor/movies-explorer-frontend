import './MoviesCardList.css';
import React from 'react';
import MoviesCardAdded from '../MoviesCard/MoviesCardAdded';

function MoviesCardListSaved() {
  return (
    <section className="cards container">
        <MoviesCardAdded />
        <MoviesCardAdded />
        <MoviesCardAdded />
    </section>
  );
}

export default MoviesCardListSaved;