import './MoviesCard.css';
import React from 'react';
import imgCard from '../../images/card-1.jpg'; 

function MoviesCardAdded() {
  return (
    <article className="card">
        <div className="card__header">
          <h2 className="card__title">В погоне за Бенкси</h2>
          <p className="card__duration">27 минут</p>
        </div>
        <img className="card__img" src={imgCard} alt="В погоне за Бенкси" />
        <div className="card__footer">
          <button className="card__btn card__btn_type_delete">
            </button>
        </div>
    </article>
  );
}

export default MoviesCardAdded;