import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox(props) {
  const [isCheck, setIsCheck] = React.useState(localStorage.getItem(`${props.page}-isCheck`) ? true : false);
  
  function handleSearchShort(e){
    setIsCheck(!isCheck);

    if(!isCheck){
      localStorage.setItem(`${props.page}-isCheck`, !isCheck);
    } else {
      localStorage.removeItem(`${props.page}-isCheck`);
    }

    props.onCheck(e.target.checked);
  }

  return (
    <label className="checkbox" htmlFor="short">
        <span className="checkbox__title">Короткометражки</span>
        <input id="short" type="checkbox" name="short" checked={isCheck} className="checkbox__input" onChange={handleSearchShort} />
        <span className="checkbox__toggle"></span>
    </label>
  );
}

export default FilterCheckbox;