import React from 'react';
import './SignForm.css';
import { Link } from 'react-router-dom';

function SignForm(props){
    return(
        <section className="sign-page register">
            <Link className="logo sign-page__logo" to="/"></Link>
            <h1 className="page-title sign-title">{props.title}</h1>

            <form className={`form form-${props.name}`} name={props.name} method="post" onSubmit={props.onSubmit}>
                {props.children}
                <fieldset className="form__handlers">
                    <button disabled={ !props.isValid } type="submit" className={ `form__button ${!props.isValid ? 'form__button_disabled' : '' } `}>{props.buttonText}</button>
                    {props.desc}
                </fieldset>
            </form>
        </section>
    );
}

export default SignForm;