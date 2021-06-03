import './style.scss';
import { Route, Switch } from 'react-router';
import Home from 'src/routes/Home/component';
import { NavLink } from 'react-router-dom';
import FavoriteRouter from 'src/routers/FavoriteRouter';
import Toast from 'src/Toast/component';

function App() {
  
  return (
    <div id="wrap">
      <section id="nav-bar">
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
      <Toast />
    </div>
  );
}

export default App;
