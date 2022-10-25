import {Route } from 'react-router-dom';
import './App.css';
import CreateRecipe from './components/createRecipe';
import DetailRecipe from './components/detailRecipe';
import ErrorPage from './components/errorPage';
import FilterRecipe from './components/filter';
import LandingPage from './components/landingPage';
import NavBar from './components/navBar';
import RenderRecipes from './components/renderRecipes';


function App() {
  return (
    <div className="App">
      <Route exact path={"/"}><LandingPage/></Route>
      <Route exact path={"/recipes"}><NavBar/></Route>
      <Route exact path={"/recipes"}><FilterRecipe/></Route>
      <Route exact path={"/recipes"}><RenderRecipes/></Route>
      <Route className="detail" exact path={"/recipes/detail/:id"}><DetailRecipe/></Route>
      <Route exact path={"/recipes/create"}><CreateRecipe/></Route>
      <Route path={"/recipes/create/*"}>{<ErrorPage/>}</Route>
      
      
                  
    </div>
  );
}

export default App;
