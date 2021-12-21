import './MoviesCard.css';
import React from 'react';
import { Link } from 'react-router-dom';

function MoviesCard(props) {
  const [isSave, setIsSave] = React.useState(false);
  
  const hours = Math.floor(props.card.duration / 60);
  const minutes = props.card.duration % 60;
  
  React.useEffect(() => {
    if(props.savedMovies.some( item => item.movieId === props.card.id)){
      setIsSave(true);
    }
  }, []);

  function handleClickMovie(){
    if(props.isSavedPage){
      props.onDelete(props.card._id);
    } else {
      if(isSave){
        const card = props.savedMovies.find(i => i.movieId === props.card.id);
        if(card){
          props.onDelete(card._id);
          setIsSave(!isSave);
        }
      } else {
        props.onSave(props.card);
        setIsSave(!isSave);
      }
    }
  }

  return (
    <article className="card">
      <Link className="card__link" to={{ pathname: props.card.trailer }} target="_blank">
        <div className="card__header">
          <h2 className="card__title">{props.card.nameRU}</h2>
          <p className="card__duration">
            { hours > 0 ? `${hours} ч. ` : '' }
            { minutes > 0 ? `${minutes} мин. ` : '' }
          </p>
        </div>

        { typeof(props.card.image.url) === "string" ? 
          <img className="card__img" src={`https://api.nomoreparties.co${props.card.image.url}`} alt={props.card.nameRU} />
          : '' }
        
        { typeof(props.card.image) === "string" ? 
          <img className="card__img" src={props.card.image} alt={props.card.nameRU} />
          : '' }
      </Link>
        
      <div className="card__footer">
        <button className={`card__btn ${ isSave ? 'card__btn_type_saved' : 'card__btn_type_save'} ${props.isSavedPage ? 'card__btn_type_delete' : '' }`} type="button" onClick={handleClickMovie}>
          {!isSave && !props.isSavedPage ? 'Сохранить' : '' }
          </button>
      </div>
    </article>
  );
}

export default MoviesCard;