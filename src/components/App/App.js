import './App.css';
import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import * as auth from '../../utils/Auth.js';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'
import moviesApi from '../../utils/MoviesApi.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [isLoadingCards, setIsLoadingCards] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);

  const [showCard, setShowCard] = React.useState(5);
  const [currentCard, setCurrentCard] = React.useState(7);
  const [dowloadCard, setDownloadCard] = React.useState(2);

  const [showCards, setShowCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '', _id: '' });
  const [statusSuccessRegister, setStatusSuccessRegister] = React.useState('false');
  const [isStatusSuccessPopupOpen, setIsStatusSuccessPopupOpen] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      authHandle(jwt);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      authHandle(jwt);
      history.push(location);
    }
  }, []);

  function authHandle(jwt){
    return auth.getUser(jwt)
      .then((res) => {
        if (res.email) {
          setLoggedIn(true);
        }
      })
      .catch((err)=>{ 
        console.log(err);
      });
  };

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

  function onRegister({ password, email, name }) {
    return auth.register(password, email, name)
      .then((res) => {
        if(res._id){
          history.push('/signin');
          setStatusSuccessRegister('success');
        }
      })
      .catch((err) => {
        console.log(err);
        setStatusSuccessRegister('error');
      })
      .finally(() => setIsStatusSuccessPopupOpen(true));
  };

  function onLogin({password, email}){
    return auth.authorize(password, email)
      .then((res) => {
        if (!res){
          setStatusSuccessRegister('error');
          setIsStatusSuccessPopupOpen(true);
        }
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('/movies');
        }
      })
      .catch((err) => { 
        setStatusSuccessRegister('error');
        setIsStatusSuccessPopupOpen(true);
        console.log(err);
      });
  }

  function onSignOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  };

  function closeAllPopups(){
    setIsStatusSuccessPopupOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} onSignOut={onSignOut} isDark={true} />
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
              onSignOut={onSignOut}
          />
          
          <Route exact path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        {statusSuccessRegister && <InfoTooltip status={statusSuccessRegister} isOpen={isStatusSuccessPopupOpen} onClose={closeAllPopups} />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
