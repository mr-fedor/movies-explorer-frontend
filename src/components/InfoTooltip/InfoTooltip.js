import './InfoTooltip.css';
import React from 'react';
import imgStatusError from '../../images/status_error.svg';
import imgStatusSucess from '../../images/status_success.svg';

function InfoTooltip(props){
    return(
        <div className={`popup popup_type_status ${props.isOpen === true ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_status">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                
                {props.status === 'success' && 
                    <img 
                        className="popup__img-status" 
                        alt="Статус" 
                        src={imgStatusSucess} 
                    />  
                }
                {props.status === 'error' && 
                    <img 
                        className="popup__img-status" 
                        alt="Статус" 
                        src={imgStatusError} 
                    />  
                }
                <p className="popup__text-status">
                    {props.status === 'success' && "Вы успешно зарегистрировались!"}
                    {props.status === 'error' && "Что-то пошло не так! Попробуйте ещё раз."}
                </p>
            </div>
        </div>
    );
}

export default InfoTooltip;