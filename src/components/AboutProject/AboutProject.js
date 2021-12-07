import './AboutProject.css';
import React from 'react';

function AboutProject() {
  return (
    <section className="block about-project">
      <div className="container">
        <h2 className="block__title">О проекте</h2>

        <div className="about-project__content">
          <article className="about-project__article">
            <h3 className="about-project__article-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__article-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
          </article>
          <article className="about-project__article">
            <h3 className="about-project__article-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__article-text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </article>
        </div>

        <ul className="about-project__bar bar">
          <li className="bar__item bar__item_type_backend">
            <div className="bar__line bar__line_bg_green">
              <p className="bar__title">1 неделя</p>
            </div>
            <p className="bar__desc">Back-end</p>
          </li>
          <li className="bar__item bar__item_type_frontend">
            <div className="bar__line">
              <p className="bar__title">4 недели</p>
            </div>
            <p className="bar__desc">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;