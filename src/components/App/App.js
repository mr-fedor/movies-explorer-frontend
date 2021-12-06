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
import Cards from '../Cards/Cards';

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
          <Cards />
          <Footer />
        </Route>
        <Route exact path="/saved-movies"></Route>
        <Route exact path="/profile"></Route>
        <Route exact path="/signin"></Route>
        <Route exact path="/signup"></Route>
        <Route path="*"></Route>
      </Switch>
    </div>
  );
}

export default App;
