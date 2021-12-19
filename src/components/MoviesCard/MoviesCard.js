import './MoviesCard.css';
import React from 'react';

function MoviesCard(props) {
  const [isSave, setIsSave] = React.useState(false);
  
  const hours = Math.floor(props.card.duration / 60);
  const minutes = props.card.duration % 60;
  
  return (
    <article className="card">
        <div className="card__header">
          <h2 className="card__title">{props.card.nameRU}</h2>
          <p className="card__duration">
            { hours > 0 ? `${hours} ч. ` : '' }
            { minutes > 0 ? `${minutes} мин. ` : '' }
          </p>
        </div>
        <img className="card__img" src={`https://api.nomoreparties.co${props.card.image.url}`} alt={props.card.nameRU} />
        <div className="card__footer">
          <button className={`card__btn ${ isSave ? 'card__btn_type_saved' : 'card__btn_type_save'}`} type="button" onClick={() => {setIsSave(!isSave)}}>
            {!isSave ? 'Сохранить' : '' }
            </button>
        </div>
    </article>
  );
}

export default MoviesCard;