import React, { useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import CityForm from './components/CityForm';
import Home from './components/Home';

const App = () => {
  const [ isAuthed, setAuth ] = useState(false);
  const [ currPage, setPage ] = useState('home'); // home, profile, city
  const [ currCity, setCity ] = useState('dummyInit');

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
    console.log(cityName);
    alert(cityName)
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
      />
      <div className="main">
      {/*Main conditional Display here*/}
      {currPage === "home" &&
        <Home cityHandler={cityHandler} />
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
