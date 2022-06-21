import './App.css';
import { Route } from "react-router-dom";
import CountryDetail from './components/CountryDetail/CountryDetail';
import LandingPage from './components/LandingPage/LandingPage'
import MainPage from './components/MainPage/MainPage';
import CreateActivity from './components/CreateActivity/CreateActivity';


function App() {
  return (
    //<div className="App"> <h1>Henry Countries</h1>  </div>
      <>
         <Route exact path='/'><LandingPage/> </Route>  
         <Route exact path='/Countries'><MainPage/> </Route>  
         <Route exact path='/Countries/:id'><CountryDetail/> </Route>
         <Route exact path='/CreateActivity'><CreateActivity/> </Route>

      </>
  );
}

export default App;
