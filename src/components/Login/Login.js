import './Login.css';
import React from 'react';
import SignForm from '../SignForm/SignForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <SignForm name="login" title="Рады видеть!" buttonText='Войти' desc={<p className="form__desc">Ещё не зарегистрированы? <Link to="/signup" className="form__link">Регистрация</Link></p>}>
      <fieldset className="form__fieldset">
          <label className="form__label">
              <span className="form__label-title">Имя</span>
              <input className="form__input form__input_name" name="name" type="text" id="name-input" />
              <span className="form__error name-input-error"></span>
          </label>
          <label className="form__label">
              <span className="form__label-title">Пароль</span>
              <input className="form__input form__input_password" name="password" type="password" id="password-input" />
              <span className="form__error password-input-error"></span>
          </label>
      </fieldset>
    </SignForm>
  );
}

export default Login;