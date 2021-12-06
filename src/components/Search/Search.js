import './Search.css';
import React from 'react';

function Search() {
  return (
    <section className="search container">
        <form className="search__form">
            <div className="search__row">
                <input name="search" className="search__input" placeholder="Фильм" />
                <button type="submit" className="search__btn">Найти</button>
            </div>
            <label className="search__short checkbox" htmlFor="short">
                <span className="checkbox__title">Короткометражки</span>
                <input id="short" type="checkbox" name="short" className="checkbox__input" />
                <span className="checkbox__toggle"></span>
            </label>
        </form>
    </section>
  );
}

export default Search;