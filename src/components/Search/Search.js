import './Search.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function Search() {
  return (
    <section className="search container">
        <form className="search__form">
            <div className="search__row">
                <input name="search" className="search__input" placeholder="Фильм" required />
                <button type="submit" className="search__btn">Найти</button>
            </div>
            <FilterCheckbox />
        </form>
    </section>
  );
}

export default Search;