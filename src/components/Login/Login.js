import './Login.css';
import React from 'react';
import SignForm from '../SignForm/SignForm';
import { Link, useHistory } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [isValidForm, setIsValidForm] = React.useState(false);

  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault();

    if(isValidForm){
      props.onLogin({ password, email });
    }
  };

  function handleEmail(e){
    if(!e.target.validity.valid){
      setErrorEmail(e.target.validationMessage);
      setIsValidForm(false);
    } else {
      if(errorPassword === ''){
        setIsValidForm(true);
      }
      setErrorEmail('');
    }

    setEmail(e.target.value);
  }

  function handlePassword(e){
    if(!e.target.validity.valid){
      setErrorPassword(e.target.validationMessage);
      setIsValidForm(false);
    } else {
      if(errorEmail === ''){
        setIsValidForm(true);
      }
      setErrorPassword('');
    }
    
    setPassword(e.target.value);
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
        history.push('/movies');
    }
  }, []);

  return (
    <SignForm isValid={isValidForm} name="login" title="Рады видеть!" buttonText='Войти' desc={<p className="form__desc">Ещё не зарегистрированы? <Link to="/signup" className="form__link">Регистрация</Link></p>} onSubmit={handleSubmit}>
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
                onChange={handleEmail}  
              />
              <span className="form__error name-input-error">{errorEmail}</span>
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
                onChange={handlePassword} 
              />
              <span className="form__error password-input-error">{errorPassword}</span>
          </label>
      </fieldset>
    </SignForm>
  );
}

export default Login;