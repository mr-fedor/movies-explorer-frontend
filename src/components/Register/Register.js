import './Register.css';
import React from 'react';
import SignForm from '../SignForm/SignForm';
import { Link, useHistory } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault();

    props.onRegister({ password, email, name });
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
        history.push('/movies');
    }
  }, []);

  return (
    <SignForm name="register" onSubmit={handleSubmit} title="Добро пожаловать" buttonText='Сохранить' desc={<p className="form__desc">Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link></p>}>
      <fieldset className="form__fieldset">
          <label className="form__label">
              <span className="form__label-title">Имя</span>
              <input 
                minLength="2"
                maxLength="30"
                required
                className="form__input form__input_name" 
                name="name" 
                type="text" 
                id="name-input" 
                value={name}
                onChange={e => setName(e.target.value)} 
              />
              <span className="form__error name-input-error"></span>
          </label>
          <label className="form__label">
              <span className="form__label-title">E-mail</span>
              <input 
                required
                className="form__input form__input_email" 
                name="email" 
                type="email" 
                id="email-input"
                value={email}
                onChange={e => setEmail(e.target.value)}  
              />
              <span className="form__error email-input-error"></span>
          </label>
          <label className="form__label">
              <span className="form__label-title">Пароль</span>
              <input 
                required
                minLength="8"
                className="form__input form__input_password" 
                name="password" 
                type="password" 
                id="password-input"
                value={password}
                onChange={e => setPassword(e.target.value)} 
              />
              <span className="form__error password-input-error"></span>
          </label>
      </fieldset>
    </SignForm>
  );
}

export default Register;