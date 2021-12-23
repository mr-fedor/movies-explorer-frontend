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

  const [foundCards, setFoundCards] = React.useState([]);
  const [showCards, setShowCards] = React.useState([]);
  const [showSavedMovies, setShowSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '', _id: '' });
  
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isNotFoundSaved, setIsNotFoundSaved] = React.useState(false);

  const [statusSuccessPopup, setStatusSuccessPopup] = React.useState('false');
  const [isStatusSuccessPopupOpen, setIsStatusSuccessPopupOpen] = React.useState(false);
  const [titlePopup, setTitlePopup] = React.useState('');

  const history = useHistory();
  const location = useLocation();
  const pageMovies = 'movies';
  const pageSavedMovies = 'saved-movies';

  // User
  React.useEffect(() => {
    if(loggedIn){
      return Promise.all([ 
        mainApi.getUserInfo(),
      ])
      .then((values)=>{
        setCurrentUser(values[0]);
      })
      .catch((err)=>{ 
        console.log(err);

        setIsStatusSuccessPopupOpen(true);
        setStatusSuccessPopup('error');
        setTitlePopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      });
    }
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      return authHandle(jwt);
    }
  }, [loggedIn]);

  function authHandle(jwt){
    return auth.getUser(jwt)
      .then((res) => {
        if (res.email) {
          setLoggedIn(true);
          setCurrentUser(res);

          if (location.pathname === "/profile") {
            history.push('/profile')
          } else if (location.pathname === "/movies") {
            history.push('/movies')
          } else if (location.pathname === "/saved-movies") {
            history.push('/saved-movies')
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

        setIsStatusSuccessPopupOpen(true);
        setStatusSuccessPopup('error');
        setTitlePopup('Что-то пошло не так! Попробуйте ещё раз.');
      })
  };

  function onLogin({password, email}){
    return auth.authorize(password, email)
      .then((res) => {
        if (!res){
          setIsStatusSuccessPopupOpen(true);
          setStatusSuccessPopup('error');
          setTitlePopup('Что-то пошло не так! Попробуйте ещё раз.');
        }

        if (res) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('/movies');
        }
      })
      .catch((err) => { 
        setIsStatusSuccessPopupOpen(true);
        setStatusSuccessPopup('error');
        setTitlePopup('Что-то пошло не так! Попробуйте ещё раз.');

        localStorage.clear();
        console.log(err);
      });
  }

  function onSignOut(){
    localStorage.clear();
    setCards([]);
    setShowCards([]);
    setSavedMovies([]);
    setLoggedIn(false);
    history.push('/');
  };

  function handleUpdateUser(data){
    mainApi.setUserInfo(data).then(user => {
      setCurrentUser(user);

      setIsStatusSuccessPopupOpen(true);
      setStatusSuccessPopup('success');
      setTitlePopup('Профиль обновлен!');
    }).catch((err) => {
      console.log(err);
      
      setIsStatusSuccessPopupOpen(true);
      setStatusSuccessPopup('error');
      setTitlePopup('Что-то пошло не так! Попробуйте ещё раз.')
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

  React.useEffect(() => {
    if(localStorage.getItem(`${pageMovies}-inputSearch`)){
      handleSearchFilms(localStorage.getItem(`${pageMovies}-inputSearch`), localStorage.getItem(`${pageMovies}-isCheck`));
    }
  }, []);

  function handleSearchFilms(searchInput, searchShort = false){
    setIsLoadingCards(true);
    setIsNotFound(true);
    
    setFoundCards([]);
    setShowCards([]);
    setCards([]);

    if(!localStorage.getItem('cards')){
      moviesApi.getFilms().then(res => {
        localStorage.setItem('cards', JSON.stringify(res));
        setCards(res);
        
        setFoundCards(res.filter(function(item){
          if(item.nameRU.toLowerCase().includes(searchInput.toLowerCase())){
            if(searchShort && item.duration > 40){
              return false;
            }
            setIsNotFound(false);
            return item;
          }
    
          if(!localStorage.getItem('currentCard')){
            localStorage.setItem('currentCard', showCard);
          }
    
          return false;
        }));
      })
      .catch((err) => {
        console.log(err);
        
        setIsStatusSuccessPopupOpen(true);
        setStatusSuccessPopup('error');
        setTitlePopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
      .finally(() => {
        setIsLoadingCards(false); 
      });
    } else {
      setCards(JSON.parse(localStorage.getItem('cards')));

      setFoundCards(JSON.parse(localStorage.getItem('cards')).filter(function(item){
        if(item.nameRU.toLowerCase().includes(searchInput.toLowerCase())){
          if(searchShort && item.duration > 40){
            return false;
          }
          setIsNotFound(false);
          return item;
        }
  
        if(!localStorage.getItem('currentCard')){
          localStorage.setItem('currentCard', showCard);
        }
  
        return false;
      }));
    }

    setIsLoadingCards(false); 
  }

  function handleShortFilms(searchShort){
    setIsNotFound(true);

    handleSearchFilms(localStorage.getItem(`${pageMovies}-inputSearch`), searchShort);
  }

  React.useEffect(() => {
    setShowCards(foundCards.slice(0, showCard));
  }, [foundCards]);

  function handleMoreCards(){
    setCurrentCard(currentCard + dowloadCard);
    localStorage.setItem('currentCard', currentCard);
    setShowCards(foundCards.slice(0, currentCard));
  }

  React.useEffect(() => {
    if(loggedIn){
      if(localStorage.getItem("savedMovies")){
        setSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
        setShowSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
      } else {
        return Promise.all([ 
          mainApi.getSavedMovies(),
        ])
        .then((values)=>{
          setSavedMovies(values[0]);
          setShowSavedMovies(values[0]);
          localStorage.setItem("savedMovies", JSON.stringify(values[0]));
        })
        .catch((err)=>{ 
          console.log(err);

          setIsStatusSuccessPopupOpen(true);
          setStatusSuccessPopup('error');
          setTitlePopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        });
      }
    }
  }, []);

  React.useEffect(() => {
    if(localStorage.getItem(`${pageSavedMovies}-inputSearch`)){
      handleSearchSavedFilms(localStorage.getItem(`${pageSavedMovies}-inputSearch`), localStorage.getItem(`${pageSavedMovies}-isCheck`));
    }
  }, [savedMovies]);

  function handleSaveMovie(card){
    mainApi.addMovie(card).then(res => {
      setSavedMovies([...savedMovies, res]);
      setShowSavedMovies([...savedMovies, res]);
      localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, res]));
    }).catch((err) => {
      console.log(err); 
    });
  }

  function handleSearchSavedFilms(searchInput, searchShort = false){
    setIsNotFoundSaved(true);
    setShowSavedMovies(savedMovies.filter(function(item){
      if(item.nameRU.toLowerCase().includes(searchInput.toLowerCase())){
        if(searchShort && item.duration > 40){
          return false;
        }
        
        setIsNotFoundSaved(false);
        return item;
      }

      return false;
    }));
  }

  function handleShortSavedFilms(searchShort){
    handleSearchSavedFilms(localStorage.getItem(`${pageSavedMovies}-inputSearch`), searchShort);
  }

  function handleDeleteMovie(idCard){
    mainApi.deleteMovie(idCard).then(res => {
      setSavedMovies(savedMovies.filter((item) => {
        return item._id !== res._id;
      }));
      setShowSavedMovies(savedMovies.filter((item) => {
        return item._id !== res._id;
      }));
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter((item) => {
        return item._id !== res._id;
      })));
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
              handleShortFilms={handleShortFilms}
              isLoadingCards={isLoadingCards} 
              showCards={showCards} 
              foundCards={foundCards}
              isNotFound={isNotFound} 
              savedMovies={savedMovies}
              handleMoreCards={handleMoreCards}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              page={pageMovies}
          />

          <ProtectedRoute
              exact
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              onSearchFilms={handleSearchSavedFilms}
              handleShortFilms={handleShortSavedFilms}
              isLoadingCards={isLoadingCards} 
              showCards={showSavedMovies}
              isNotFound={isNotFoundSaved} 
              savedMovies={savedMovies}
              isSavedPage={true}
              handleDeleteMovie={handleDeleteMovie}
              page={pageSavedMovies}
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

        {statusSuccessPopup && <InfoTooltip status={statusSuccessPopup} isOpen={isStatusSuccessPopupOpen} onClose={closeAllPopups} title={titlePopup} />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
