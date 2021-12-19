import './AboutMe.css';
import React from 'react';
import { Link } from 'react-router-dom';
import student from '../../images/cat.jpg'; 

function AboutMe() {
  return (
    <section className="block about-me">
      <div className="container">
        <h2 className="block__title">Студент</h2>

        <article className="about-me__container student">
          <img className="student__img" src={student} alt="Алексей" />
          <div className="student__content">
            <h3 className="student__title">Алексей</h3>
            <p className="student__status">Фронтенд-разработчик, 29 лет</p>
            <p className="student__text">Я родился и живу в Кирове, закончил факультет экономики СГУ. Я люблю слушать музыку, а ещё увлекаюсь бегом. С 2015 года занимаюсь веб-разработкой. 
            </p>

            <ul className="student__list">
              <li className="student__item"><Link to={{ pathname: "https://t.me/mr_fedor" }} target="_blank" className="student__link">Telegram</Link></li>
              <li className="student__item"><Link to={{ pathname: "https://github.com/mr-fedor" }} target="_blank" className="student__link">GitHub</Link></li>
            </ul>
          </div>
        </article>

        <h3 className="about-me__title-portfolio">Портфолио</h3>
        <ul className="portfolio-list">
          <li className="portfolio-list__item">
            <Link to="#" className="portfolio-list__link" target="_blank">Статичный сайт</Link>
          </li>
          <li className="portfolio-list__item">
            <Link to="#" className="portfolio-list__link" target="_blank">Адаптивный сайт</Link>
          </li>
          <li className="portfolio-list__item">
            <Link to="#" className="portfolio-list__link" target="_blank">Одностраничное приложение</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;