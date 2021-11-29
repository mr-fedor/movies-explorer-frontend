import './Techs.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Techs() {
  return (
    <section className="block techs">
      <div className="container">
        <h2 className="block__title">Технологии</h2>

        <h3 className="techs__sub-title">7 технологий</h3>
        <p className="techs__desc">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

        <ul className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;