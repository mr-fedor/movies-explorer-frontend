import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  return (
    <section className="cards container">
        { props.isLoadingCards ? <Preloader /> : props.isNotFound ? <p className="cards__not-found">Ничего не найдено</p> : '' }

        {props.showCards.map((item) => {
          return(<MoviesCard key={item.id || item._id} card={item} onSave={props.handleSaveMovie} savedMovies={props.savedMovies} onDelete={props.handleDeleteMovie} isSavedPage={props.isSavedPage} />);
        })}

        { !props.isSavedPage && props.showCards.length > 0 && props.foundCards.length > props.showCards.length ? 
          <div className="cards__more">
              <button className="cards__btn" type="button" onClick={props.handleMoreCards}>Ещё</button>
          </div>
          : ''
        }
    </section>
  );
}

export default MoviesCardList;