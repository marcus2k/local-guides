import React, { useEffect, useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Home from './components/Home';
import CityPage from './components/CityPage';
import guidesServices from './services/guides';
import { Alert } from 'react-bootstrap';
import Profile from './components/Profile';
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [ userProfile, setProfile ] = useState(null)
  const [ currPage, setPage ] = useState('home'); // home, profile, city
  const [ currCity, setCity ] = useState('dummyInit');
  const [ showAlert, setAlert ] = useState(false);
  const [ missingProfile, setMissingProfile ] = useState(false);

  console.log(userProfile);
  
  useEffect(() => {
    if (user) {
      guidesServices
      .getUserProfile(user.email)
      .then(p => {
        console.log(p);
        setProfile(p);
        setMissingProfile(false);
      })
      .catch(err => {
        console.log(err);
        setMissingProfile(true); // 404 not found?
      })
    }
  }, [user]);

  const deleteHandler = () => {
    guidesServices
    .deleteUser(user.email)
    .then(p => {
      console.log(p);
      setPage("home");
      setProfile(null);
      setMissingProfile(true);
    })
  }

  const loginHandler = () => {
    loginWithRedirect();
    setAlert(false);
  }

  const logoutHandler = () => {
    logout();
    setAlert(false);
    setPage('home');
  }

  const pageHandler = x => () => {
    setPage(x);
    setAlert(false);
  }

  const updateUser = x => {
    setProfile(x);
    setMissingProfile(false);
  }

  const cityHandler = (cityName) => event => {
    event.preventDefault();
    if (!cityName) {
      setAlert(true);
      setTimeout(() => setAlert(false), 5000);
      return;
    }
    setAlert(false);
    console.log(cityName);
    setCity(cityName);
    setPage('city');
  }
  
  return (
    <div className="App">
      <AppBar 
      isAuthed={isAuthenticated}
      loginHandler={loginHandler}
      logoutHandler={logoutHandler}
      pageHandler={pageHandler}
      cityHandler={cityHandler}
      currPage={currPage}
      />
      {showAlert && 
        <Alert variant='danger'>
            Please select a valid city from the dropdown list.
        </Alert>
      }
      <div className="main">
      {currPage === "home" &&
        <Home cityHandler={cityHandler} />
      }
      {currPage === "city" &&
        <CityPage city={currCity} />
      }
      {currPage === "profile" && 
        <Profile deleteHandler={deleteHandler} isBlank={missingProfile} email={user.email} saveHandler={updateUser} user={userProfile} />
      }
      </div>
      {!isAuthenticated && 
        <div className="unauthed-footer">
          <p>Here as a guide? <a href="#" onClick={loginHandler}>Login</a> to set up your profile!<br/></p>
        </div>
      }
    </div>
  );
}

export default App;
