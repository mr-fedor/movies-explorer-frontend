import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className="cards container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />

        <div className="cards__more">
            <button className="cards__btn" type="button">Ещё</button>
        </div>
    </section>
  );
}

export default MoviesCardList;