import './App.scss';
import { Route } from 'react-router';
import Home from './components/containers/Home/Home';
import Favorites from './components/containers/Favorites/Favorites';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div id="wrap">
      <section className="nav-bar">
        <ul className="tab">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </section>
      <div id="content-area">
        <Route exact path="/" component={Home}/>
        <Route path="/favorites" component={Favorites}/>
      </div>
    </div>
  );
}

export default App;
