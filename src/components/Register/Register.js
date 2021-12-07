import './Register.css';
import React from 'react';
import SignForm from '../SignForm/SignForm';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <SignForm name="register" title="Добро пожаловать" buttonText='Сохранить' desc={<p className="form__desc">Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link></p>}>
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
    </SignForm>
  );
}

export default Register;