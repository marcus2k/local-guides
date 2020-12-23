import React, { useEffect, useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Home from './components/Home';
import CityPage from './components/CityPage';
import citiesServices from './services/cities';
import guidesServices from './services/guides';
import { Alert } from 'react-bootstrap';
import Profile from './components/Profile';

const SAMPLE_EMAIL = "marcus@u.nus.edu";
/*
{ // sample user
  id: "0",
  name: "Marcus",
  gender: "M",
  cities: ["Bali, Indonesia"],
  hourlyRate: ["SGD", 80],
  transport: 3,
  languages: ["English", "Chinese", "Indonesian"],
  intro: "Hi, my name is Marcus.",
  email: "marcus@u.nus.edu",
  mobile: "00000000",
};*/

const App = () => {
  const [ isAuthed, setAuth ] = useState(false);
  const [ currPage, setPage ] = useState('home'); // home, profile, city
  const [ currCity, setCity ] = useState('dummyInit');
  const [ showAlert, setAlert ] = useState(false);
  const [ user, setUser ] = useState (null);
  const [ currencies, setCurrencies ] = useState([
    "AUD", "SGD", "IDR", "USD", "THB",
  ])
  /*
  const [ citiesList, setCitiesList ] = useState([
    "New York, USA", 
    "Bali, Indonesia", 
    "Singapore, Singapore", 
    "Bangkok, Thailand", 
    "Melbourne, Australia"
  ]);

  useEffect(() => guidesServices
    .getAllCities()
    .then(lst => {
      console.log(lst);
      setCitiesList(lst);
    })
  , [user]);*/
  
  useEffect(() => guidesServices
    .getUserProfile(SAMPLE_EMAIL)
    .then(p => {
      console.log(p);
      setUser(p);
    })
  , [])
  /*useEffect(() => guidesServices
    .getAllGuides()
    .then(lst => {
        console.log(lst);
        setGuides(lst);
    })
  , [user]);
  /*
  useEffect(() => citiesServices
  .getAllCities()
  .then(lst => {
    console.log(lst); 
    setCitiesList(lst);
  })
  , []);
  */

  const login = () => {
    setAuth(true);
    setAlert(false);
  }

  const logout = () => {
    setAuth(false);
    setAlert(false);
    setPage('home');
  }

  const pageHandler = x => () => {
    setPage(x);
    setAlert(false);
  }

  const updateUser = x => setUser(x);

  const cityHandler = (cityName) => event => {
    event.preventDefault();
    if (!cityName) {
      // alert("Please select a valid city. If you are a guide, you may add your city through your profile!");
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
      isAuthed={isAuthed}
      loginHandler={login}
      logoutHandler={logout}
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
        <CityPage city={currCity} user={user} />
      }
      {currPage === "profile" &&
        <Profile currencies={currencies} saveHandler={updateUser} user={user} logoutHandler={logout}/>
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
