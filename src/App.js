import React, { useEffect, useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Home from './components/Home';
import cities from './services/cities.js';

const App = () => {
  const [ isAuthed, setAuth ] = useState(false);
  const [ currPage, setPage ] = useState('home'); // home, profile, city
  const [ currCity, setCity ] = useState('dummyInit');
  const [ citiesList, setCitiesList ] = useState([
    "New York, USA", 
    "Bali, Indonesia", 
    "Singapore, Singapore", 
    "Bangkok, Thailand", 
    "Melbourne, Australia"
  ]);

  /*
  useEffect(() => cities
  .getAllCities()
  .then(lst => {
    console.log(lst); 
    setCitiesList(lst);
  })
  , []);
  */

  console.log(citiesList);
  const login = () => {
    setAuth(true);
  }

  const logout = () => {
    setAuth(false);
    setPage('home');
  }

  const pageHandler = x => () => setPage(x);

  const cityHandler = (cityName) => event => {
    event.preventDefault();
    if (!cityName) {
      alert("Please select a valid city. If you are a guide, you may add your city through your profile!");
      setPage('home');
      return;
    }
    console.log(cityName);
    setCity(cityName);
    setPage('city');
  }
  
  return (
    <div className="App">
      <AppBar 
      isAuthed={isAuthed}
      loginHandler={login}
      logoutHandler={logout}
      pageHandler={pageHandler}
      cityHandler={cityHandler}
      currPage={currPage}
      citiesList={citiesList}
      />

      <div className="main">
      {/*Main conditional Display here*/}
      {currPage === "home" &&
        <Home cityHandler={cityHandler} citiesList={citiesList}/>
      }
      </div>
      {!isAuthed && 
        <div className="unauthed-footer">
          <p>Here as a guide? <a href="#" onClick={login}>Login</a> to set up your profile!<br/></p>
        </div>
      }
    </div>
  );
}

export default App;
