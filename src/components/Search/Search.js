import './Search.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function Search(props) {
  const [searchInput, setSearchInput] = React.useState(localStorage.getItem('inputSearch') ? localStorage.getItem('inputSearch') : '');
  
  const [searchShort, setSearchShort] = React.useState();
  const [error, setError] = React.useState('');

  function handleSearchInput(e){
    localStorage.setItem('inputSearch', e.target.value);
    setSearchInput(e.target.value);
  }

  function handleSearchShort(val){
    setSearchShort(val);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(searchInput.length > 0){
      setError('');
      props.onSearchFilms(searchInput, searchShort);
    } else {
      setError('Нужно ввести ключевое слово');
    }
  }
  
  return (
    <section className="search container">
        <form action="#" className="search__form" onSubmit={handleSubmit} method="post" noValidate>
            <div className="search__row">
                <label className="search__label">
                  <input name="search" className={`search__input ${error ? 'search__input_error' : ''}`} placeholder="Фильм" value={searchInput} onChange={handleSearchInput} required />
                  <span className="search__error">{error}</span>
                </label>
                <button type="submit" className="search__btn">Найти</button>
            </div>
            <FilterCheckbox onCheckbox={handleSearchShort} value={searchShort} />
        </form>
    </section>
  );
}

export default Search;