import './Register.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <section className="sign-page register">
      <Link className="logo sign-page__logo" to="/"></Link>
      <h1 className="page-title sign-title">Добро пожаловать!</h1>

      <form className="form form-login" name="login" method="post">
        <fieldset className="form__fieldset">
          <label className="form__label">
            <span className="form__label-title">Имя</span>
            <input className="form__input form__input_name" name="name" type="text" id="name-input" />
            <span className="form__error name-input-error"></span>
          </label>
          <label className="form__label">
            <span className="form__label-title">E-mail</span>
            <input className="form__input form__input_email" name="email" type="email" id="email-input" />
            <span className="form__error email-input-error"></span>
          </label>
          <label className="form__label">
            <span className="form__label-title">Пароль</span>
            <input className="form__input form__input_error form__input_password" name="password" type="password" id="password-input" />
            <span className="form__error password-input-error">Что-то пошло не так...</span>
          </label>
        </fieldset>

        <fieldset className="form__handlers">
          <button type="submit" className="form__button">Зарегистрироваться</button>
          <p className="form__desc">Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link></p>
        </fieldset>
      </form>
    </section>
  );
}

export default Register;