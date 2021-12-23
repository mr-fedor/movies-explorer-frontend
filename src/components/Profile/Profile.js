import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import React from 'react';
import Header from '../Header/Header';

function Profile(props) {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('pochta@yandex.ru');
  const [isEdit, setIsEdit] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(e){
    setName(e.target.value);
  }

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  function handleStartEditForm(){
    setIsEdit(true);
  }

  function handleSubmit(e){
    e.preventDefault();

    props.onSubmit({name, email});
  }

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="profile form-wrapper container">
        <h1 className="profile__title page-title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" method="POST" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <div className="profile__form-row">
              <label className="profile__label" htmlFor="name">Имя</label>
              <input type="text" value={name} name="name" id="name" className="profile__input" onChange={handleNameChange} readOnly={ !isEdit ? 'readonly' : false } required />
            </div>
            <div className="profile__form-row">
              <label className="profile__label" htmlFor="email">Email</label>
              <input type="email" value={email} name="email" id="email" className="profile__input" onChange={handleEmailChange} readOnly={ !isEdit ? 'readonly' : false } required />
            </div>
          </fieldset>

          <fieldset className="profile__handlers profile__btns">
          { isEdit ?
            <button 
              className={`profile__submit ${ currentUser.email === email && currentUser.name === name ? 'profile__submit_disabled' : '' }`} 
              type="submit"
              disabled={ currentUser.email === email && currentUser.name === name ? 'disabled' : '' }>Сохранить</button>
            : 
            <button type="button" className="profile__btn profile__btn_edit" onClick={handleStartEditForm}>Редактировать</button> 
          }
          <button type="button" className="profile__btn profile__btn_logout" onClick={props.onSignOut}>Выйти из аккаунта</button>
        </fieldset>
        </form>
      </section>
    </>
  );
}

export default Profile;