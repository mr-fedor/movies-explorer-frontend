import './NotFound.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  return (
    <section className="not-found">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__desc">Страница не найдена</p>
        </div>
        <button className="not-found__back" onClick={history.goBack}>Назад</button>
    </section>
  );
}

export default NotFound;
