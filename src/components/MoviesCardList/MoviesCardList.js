import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  return (
    <section className="cards container">
        { props.isLoadingCards ? <Preloader /> : '' }
        
        {props.cards.map((item) => {
          return(<MoviesCard key={item.id} card={item} />);
        })}

        <div className="cards__more">
            <button className="cards__btn" type="button">Ещё</button>
        </div>
    </section>
  );
}

export default MoviesCardList;