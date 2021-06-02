import './App.scss';
import { Route, Switch } from 'react-router';
import Home from 'src/components/containers/Home/Home';
import Favorites from 'src/components/containers/Favorites/Favorites';
import { NavLink } from 'react-router-dom';
import FavoriteDetail from './components/containers/FavoriteDetail/FavoriteDetail';
import FavoriteRouter from './components/FavoriteRouter';

function App() {
  
  return (
    <div id="wrap">
      <section className="nav-bar">
        <ul className="tab">
          <li>
            <NavLink activeClassName="visited" exact to="/">Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName="visited" to="/favorites">Favorites</NavLink>
          </li>
        </ul>
      </section>
      <div id="content-area">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/favorites" component={FavoriteRouter}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
