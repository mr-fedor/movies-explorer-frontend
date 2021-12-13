import './Search.css';
import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function Search(props) {
  const [searchInput, setSearchInput] = React.useState('');
  const [searchShort, setSearchShort] = React.useState(false);

  function handleSearchInput(e){
    setSearchInput(e.target.value);
  }

  function handleSearchShort(val){
    setSearchShort(val);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onSearchFilms(searchInput, searchShort);
  }
  
  return (
    <section className="search container">
        <form action="#" className="search__form" onSubmit={handleSubmit} method="post">
            <div className="search__row">
                <input name="search" className="search__input" placeholder="Фильм" value={searchInput} onChange={handleSearchInput} required />
                <button type="submit" className="search__btn">Найти</button>
            </div>
            <FilterCheckbox onCheckbox={handleSearchShort} value={searchShort} />
        </form>
    </section>
  );
}

export default Search;