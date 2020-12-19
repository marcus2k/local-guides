import React, { useState } from 'react';
import './App.css';
import AppBar from './components/AppBar'

function App() {
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
      />
      {/*<header className="App-header">
      </header>*/}
    </div>
  );
}

export default App;
