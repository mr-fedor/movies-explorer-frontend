import './Register.css';
import React from 'react';
import SignForm from '../SignForm/SignForm';
import { Link, useHistory } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [isErrorName, setIsErrorName] = React.useState(true);
  const [isErrorEmail, setIsErrorEmail] = React.useState(true);
  const [isErrorPassword, setIsErrorPassword] = React.useState(true);
  const [isValidForm, setIsValidForm] = React.useState(false);

  const history = useHistory();

  function handleSubmit(e){
    e.preventDefault();
    
    if(isValidForm){
      props.onRegister({ password, email, name });
    }
  }

  function handleName(e){
    if(!e.target.validity.valid){
      setErrorName(e.target.validationMessage);
      setIsValidForm(false);
      setIsErrorName(true);
    } else {
      if(!isErrorPassword && !isErrorEmail){
        setIsValidForm(true);
      }
      setErrorName('');
      setIsErrorName(false);
    }

    setName(e.target.value);
  }

  function handleEmail(e){
    if(!e.target.validity.valid){
      setErrorEmail(e.target.validationMessage);
      setIsValidForm(false);
      setIsErrorEmail(true);
    } else {
      if(!isErrorPassword && !isErrorName){
        setIsValidForm(true);
      }
      setErrorEmail('');
      setIsErrorEmail(false);
    }

    setEmail(e.target.value);
  }

  function handlePassword(e){
    if(!e.target.validity.valid){
      setErrorPassword(e.target.validationMessage);
      setIsValidForm(false);
      setIsErrorPassword(true);
    } else {
      if(!isErrorEmail && !isErrorName){
        setIsValidForm(true);
      }
      setErrorPassword('');
      setIsErrorPassword(false);
    }
    
    setPassword(e.target.value);
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
        history.push('/movies');
    }
  }, []);

  return (
    <SignForm isValid={isValidForm} name="register" onSubmit={handleSubmit} title="?????????? ????????????????????" buttonText='??????????????????' desc={<p className="form__desc">?????? ????????????????????????????????? <Link to="/signin" className="form__link">??????????</Link></p>}>
      <fieldset className="form__fieldset">
          <label className="form__label">
              <span className="form__label-title">??????</span>
              <input 
                minLength="2"
                maxLength="30"
                required
                className="form__input form__input_name" 
                name="name" 
                type="text" 
                id="name-input" 
                value={name}
                onChange={handleName} 
              />
              <span className="form__error name-input-error">{errorName}</span>
          </label>
          <label className="form__label">
              <span className="form__label-title">E-mail</span>
              <input 
                required
                className="form__input form__input_email" 
                name="email" 
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                id="email-input"
                value={email}
                onChange={handleEmail}  
              />
              <span className="form__error email-input-error">{errorEmail}</span>
          </label>
          <label className="form__label">
              <span className="form__label-title">????????????</span>
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

export default Register;