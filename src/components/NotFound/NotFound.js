import './NotFound.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__desc">Страница не найдена</p>
        </div>
        <Link className="not-found__back" to="/">Назад</Link>
    </section>
  );
}

export default NotFound;
