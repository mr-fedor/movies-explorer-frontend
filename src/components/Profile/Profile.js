import './Profile.css';
import React from 'react';

function Profile() {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('pochta@yandex.ru');

  function handleNameChange(e){
    setName(e.target.value);
  }

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  return (
    <section className="profile form-wrapper container">
      <h1 className="profile__title page-title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__form-row">
          <label className="profile__label" htmlFor="name">Имя</label>
          <input type="text" value={name} name="name" id="name" className="profile__input" onChange={handleNameChange} />
        </div>
        <div className="profile__form-row">
          <label className="profile__label" htmlFor="email">Email</label>
          <input type="email" value={email} name="email" id="email" className="profile__input" onChange={handleEmailChange} />
        </div>
      </form>

      <div className="profile__btns">
        <button type="button" className="profile__btn profile__btn_edit">Редактировать</button>
        <button type="button" className="profile__btn profile__btn_logout">Выйти из аккаунта</button>
      </div>
    </section>
  );
}

export default Profile;