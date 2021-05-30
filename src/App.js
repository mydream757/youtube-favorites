import './App.scss';
import { Route } from 'react-router';
import Home from './components/containers/Home';
import Favorites from './components/containers/Favorites';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div id="wrap">
      <section className="tabArea">
        <ul className="tab">
          <li className="on">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </section>
      
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/favorites" component={Favorites}/>
    </div>
  );
}

export default App;
