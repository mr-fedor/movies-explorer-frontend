import './AboutMe.css';
import React from 'react';
import { Link } from 'react-router-dom';
import student from '../../images/author.jpg'; 

function AboutMe() {
  return (
    <section className="block about-me">
      <div className="container">
        <h2 className="block__title">Студент</h2>

        <article className="about-me__container student">
          <img className="student__img" src={student} alt="Виталий" />
          <div className="student__content">
            <h3 className="student__title">Виталий</h3>
            <p className="student__status">Фронтенд-разработчик, 30 лет</p>
            <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>

            <ul class="student__list">
              <li className="student__item"><Link to="#" className="student__link">Facebook</Link></li>
              <li className="student__item"><Link to="#" className="student__link">GitHub</Link></li>
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