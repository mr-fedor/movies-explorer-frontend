import './Profile.css';
import React from 'react';

function Profile() {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('pochta@yandex.ru');
  const [isEdit, setIsEdit] = React.useState(false);

  function handleNameChange(e){
    setName(e.target.value);
  }

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  function handleStartEditForm(){
    setIsEdit(true);
  }

  return (
    <section className="profile form-wrapper container">
      <h1 className="profile__title page-title">Привет, Виталий!</h1>
      <form className="profile__form">
        <fieldset className="profile__fieldset">
          <div className="profile__form-row">
            <label className="profile__label" htmlFor="name">Имя</label>
            <input type="text" value={name} name="name" id="name" className="profile__input" onChange={handleNameChange} readOnly={ !isEdit ? 'readonly' : false } />
          </div>
          <div className="profile__form-row">
            <label className="profile__label" htmlFor="email">Email</label>
            <input type="email" value={email} name="email" id="email" className="profile__input" onChange={handleEmailChange} readOnly={ !isEdit ? 'readonly' : false } />
          </div>
        </fieldset>

        { isEdit ?
          <fieldset className="profile__handlers">
            <button className="profile__submit" type="submit">Сохранить</button>
          </fieldset>
          : '' }
      </form>

      { !isEdit ? 
        <div className="profile__btns">
          <button type="button" className="profile__btn profile__btn_edit" onClick={handleStartEditForm}>Редактировать</button>
          <button type="button" className="profile__btn profile__btn_logout">Выйти из аккаунта</button>
        </div>
        : '' }
    </section>
  );
}

export default Profile;