import './App.css';
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

function App() {
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
          <Search />
          <MoviesCardList />
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
