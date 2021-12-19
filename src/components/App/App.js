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
import MoviesCardListSaved from '../MoviesCardList/MoviesCardListSaved'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'
import moviesApi from '../../utils/MoviesApi.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';


function App() {
  const [isLoadingCards, setIsLoadingCards] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);

  const [showCard, setShowCard] = React.useState(5);
  const [currentCard, setCurrentCard] = React.useState(7);
  const [dowloadCard, setDownloadCard] = React.useState(2);

  const [showCards, setShowCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if(window.innerWidth >= 768 && window.innerWidth < 1280){
        setShowCard(8);
        setCurrentCard(10);
      } else if (window.innerWidth >= 1280) {
        setShowCard(12);
        setCurrentCard(15);
      } else {
        setShowCard(5);
        setCurrentCard(7);
      };

    function handleResize() {
      if (window.innerWidth >= 1280) {
        setDownloadCard(3);
      } else {
        setDownloadCard(2);
      };
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  function handleSearchFilms(searchInput, searchShort){
    setIsLoadingCards(true);
    setIsNotFound(true);
    
    setShowCards([]);
    setCards([]);

    moviesApi.getFilms().then(res => {
      setCards(res.filter(function(item){
        if(item.nameRU.toLowerCase().includes(searchInput.toLowerCase())){
          if(searchShort && item.duration > 40){
            return false;
          }
          
          setIsNotFound(false);
          return item;
        }

        return false;
      }));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingCards(false); 
    });
  }

  React.useEffect(() => {
    setShowCards(cards.slice(0, showCard));
  }, [cards]);

  function handleMoreCards(){
    setCurrentCard(currentCard + dowloadCard);
    setShowCards(cards.slice(0, currentCard));
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={loggedIn} />
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Footer />
        </Route>

        <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            onSearchFilms={handleSearchFilms}
            isLoadingCards={isLoadingCards} 
            cards={cards}
            showCards={showCards} 
            isNotFound={isNotFound} 
            handleMoreCards={handleMoreCards} 
        />

        <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={Movies}
            onSearchFilms={handleSearchFilms}
            isLoadingCards={isLoadingCards} 
            cards={cards}
            showCards={showCards} 
            isNotFound={isNotFound} 
            handleMoreCards={handleMoreCards} 
        />

        <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
        />
        
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
