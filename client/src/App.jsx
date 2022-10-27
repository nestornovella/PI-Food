import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import CreateRecipe from './components/createRecipe';
import DetailRecipe from './components/detailRecipe';
import ErrorPage from './components/errorPage';
import FilterRecipe from './components/filter';
import LandingPage from './components/landingPage';
import NavBar from './components/navBar';
import Home from './components/Home';
import Pagined from './components/pagined';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path={"/recipes"}><NavBar /><FilterRecipe /><Pagined/><Home /></Route>
          <Route className="detail" exact path={"/recipes/detail/:id"}><DetailRecipe /></Route>
          <Route exact path={"/recipes/create"}><CreateRecipe /></Route>
          <Route path="*" >{<ErrorPage />}</Route>
        </Switch>
      </BrowserRouter>


    </div>
  );
}

export default App;
