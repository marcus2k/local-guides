import React, { useState } from 'react';
import './App.css';
import AppBar from './components/AppBar'

function App() {
  const [ isAuthed, setAuth ] = useState(false);

  const login = () => {
    setAuth(true);
  }

  const logout = () => {
    setAuth(false);
  }

  
  
  return (
    <div className="App">
      <AppBar 
      isAuthed={isAuthed}
      loginHandler={login}
      logoutHandler={logout}
      />
      {/*<header className="App-header">
      </header>*/}
    </div>
  );
}

export default App;
