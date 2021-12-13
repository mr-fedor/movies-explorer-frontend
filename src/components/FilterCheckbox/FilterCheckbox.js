import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox(props) {
  function handleSearchShort(e){
    props.onCheckbox(e.target.checked);
  }

  return (
    <label className="checkbox" htmlFor="short">
        <span className="checkbox__title">Короткометражки</span>
        <input id="short" type="checkbox" name="short" className="checkbox__input" onChange={handleSearchShort} />
        <span className="checkbox__toggle"></span>
    </label>
  );
}

export default FilterCheckbox;