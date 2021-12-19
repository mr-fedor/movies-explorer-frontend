import './Login.css';
import React from 'react';
import SignForm from '../SignForm/SignForm';
import { Link, useHistory } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault();

    props.onLogin({ password, email });
  };

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
        history.push('/movies');
    }
}, []);

  return (
    <SignForm name="login" title="Рады видеть!" buttonText='Войти' desc={<p className="form__desc">Ещё не зарегистрированы? <Link to="/signup" className="form__link">Регистрация</Link></p>} onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
          <label className="form__label">
              <span className="form__label-title">Email</span>
              <input 
                required
                className="form__input form__input_email" 
                name="email" 
                type="email" 
                id="email-input"
                value={email}
                onChange={e => setEmail(e.target.value)}  
              />
              <span className="form__error name-input-error"></span>
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

export default Login;