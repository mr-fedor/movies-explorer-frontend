import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox() {
  return (
    <label className="checkbox" htmlFor="short">
        <span className="checkbox__title">Короткометражки</span>
        <input id="short" type="checkbox" name="short" className="checkbox__input" />
        <span className="checkbox__toggle"></span>
    </label>
  );
}

export default FilterCheckbox;