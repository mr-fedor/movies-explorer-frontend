import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import HeaderLogin from '../Header/HeaderLogin';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCardListSaved from '../MoviesCardList/MoviesCardListSaved'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'

import moviesApi from '../../utils/MoviesApi.js';

function App() {
  const [isLoadingCards, setIsLoadingCards] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  function handleSearchFilms(searchInput, searchShort){
    setIsLoadingCards(true);
    moviesApi.getFilms().then(res => {
      setIsLoadingCards(false);

      setCards(res.filter(function(item){
        if(item.nameRU.toLowerCase().includes(searchInput.toLowerCase())){
          if(searchShort && item.duration > 40){
            return false;
          }

          return item;
        }

        return false;
      }));
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header />
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Footer />
        </Route>
        <Route exact path="/movies">
          <HeaderLogin />
          <Search onSearchFilms={handleSearchFilms} />
          <MoviesCardList isLoadingCards={isLoadingCards} cards={cards} />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <HeaderLogin />
          <Search />
          <MoviesCardListSaved />
          <Footer />
        </Route>
        
        <Route exact path="/profile">
          <HeaderLogin />
          <Profile />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
