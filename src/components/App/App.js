import './App.css';
import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi.js';
import * as auth from '../../utils/Auth.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [isLoadingCards, setIsLoadingCards] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);

  const [showCard, setShowCard] = React.useState(5);
  const [currentCard, setCurrentCard] = React.useState(7);
  const [dowloadCard, setDownloadCard] = React.useState(2);

  const [showCards, setShowCards] = React.useState([]);
  const [showSavedMovies, setShowSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [error, setError] = React.useState('');
  const [errorSave, setErrorSave] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '', _id: '' });
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [statusSuccessRegister, setStatusSuccessRegister] = React.useState('false');
  const [isStatusSuccessPopupOpen, setIsStatusSuccessPopupOpen] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  // User
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      return authHandle(jwt);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if(loggedIn){
      return Promise.all([ 
        mainApi.getUserInfo(),
        mainApi.getSavedMovies(),
      ])
      .then((values)=>{
        setCurrentUser(values[0]);
        setSavedMovies(values[1]);
        setShowSavedMovies(values[1]);
        localStorage.setItem("savedMovies", JSON.stringify(values[1]));
        
        setErrorSave('');
      })
      .catch((err)=>{ 
        console.log(err);

        setErrorSave('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      });
    }
  }, [loggedIn]);

  function authHandle(jwt){
    return auth.getUser(jwt)
      .then((res) => {
        if (res.email) {
          setLoggedIn(true);

          if (location.pathname === "/profile") {
            history.push('/profile')
          } else if (location.pathname === "/movies") {
            history.push('/movies')
          } else if (location.pathname === "/saved-movies") {
            history.push('saved-movies')
          }
        }
      })
      .catch((err) => { 
        console.log(err);
      });
  };

  function onRegister({ password, email, name }) {
    return auth.register(password, email, name)
      .then((res) => {
        if(res._id){
          onLogin({password, email});
        }
      })
      .catch((err) => {
        console.log(err);
        setIsStatusSuccessPopupOpen(true)
        setStatusSuccessRegister('error');
      })
  };

  function onLogin({password, email}){
    return auth.authorize(password, email)
      .then((res) => {
        if (!res){
          setStatusSuccessRegister('error');
        }
        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('/movies');
        }
      })
      .catch((err) => { 
        setIsStatusSuccessPopupOpen(true)
        setStatusSuccessRegister('error');
        console.log(err);
      });
  }

  function onSignOut(){
    localStorage.removeItem('jwt');
    setCards([]);
    setShowCards([]);
    setSavedMovies([]);
    setLoggedIn(false);
    history.push('/');
  };

  function handleUpdateUser(data){
    mainApi.setUserInfo(data).then(user => {
      setCurrentUser(user);
    }).catch((err) => {
      console.log(err);
    });
  }

  function closeAllPopups(){
    setIsStatusSuccessPopupOpen(false);
  }

  // MovieCards
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

    handleResize();
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
      setError('');
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
      setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
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

  function handleSaveMovie(card){
    mainApi.addMovie(card).then(res => {
      setSavedMovies([...savedMovies, res]);
    }).catch((err) => {
      console.log(err); 
    });
  }

  function handleSearchSavedFilms(searchInput, searchShort){
    setIsNotFound(true);
    setShowSavedMovies(savedMovies.filter(function(item){
      if(item.nameRU.toLowerCase().includes(searchInput.toLowerCase())){
        if(searchShort && item.duration > 40){
          return false;
        }
        
        setIsNotFound(false);
        return item;
      }

      return false;
    }));
  }

  function handleDeleteMovie(idCard){
    mainApi.deleteMovie(idCard).then(res => {
      setSavedMovies(savedMovies.filter((item) => {
        return item._id !== res._id;
      }));
      setShowSavedMovies(savedMovies.filter((item) => {
        return item._id !== res._id;
      }));
    }).catch((err) => {
      console.log(err); 
    });
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
              savedMovies={savedMovies}
              handleMoreCards={handleMoreCards}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              error={error}
          />

          <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              onSearchFilms={handleSearchSavedFilms}
              isLoadingCards={isLoadingCards} 
              cards={savedMovies}
              showCards={showSavedMovies} 
              isNotFound={isNotFound} 
              savedMovies={savedMovies}
              isSavedPage={true}
              handleDeleteMovie={handleDeleteMovie}
              error={errorSave}
          />

          <ProtectedRoute
              exact
              path="/profile"
              loggedIn={loggedIn}
              component={Profile}
              onSignOut={onSignOut}
              onSubmit={handleUpdateUser}
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
