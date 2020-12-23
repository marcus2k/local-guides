import React, { useEffect, useState } from 'react';
import './App.css';
import AppBar from './components/AppBar';
import Home from './components/Home';
import CityPage from './components/CityPage';
import citiesServices from './services/cities';
import guidesServices from './services/guides';
import { Alert } from 'react-bootstrap';
import Profile from './components/Profile';

const SAMPLE_USER = 
{ // sampleData
    name: "Billie",
    cities: ["Bangkok, Thailand"],
    hourlyRate: ["THB", 40],
    transport: 3,
    languages: ["English", "Thai"],
    intro: "Hi, my name is Billie",
    email: "billie@example.com",
    mobile: "6139482193",
};

const App = () => {
  const [ isAuthed, setAuth ] = useState(false);
  const [ currPage, setPage ] = useState('home'); // home, profile, city
  const [ currCity, setCity ] = useState('dummyInit');
  const [ showAlert, setAlert ] = useState(false);
  const [ user, setUser ] = useState (null);
  const [ currencies, setCurrencies ] = useState([
    "AUD", "SGD", "IDR", "USD", "THB",
  ])
  const [ citiesList, setCitiesList ] = useState([
    "New York, USA", 
    "Bali, Indonesia", 
    "Singapore, Singapore", 
    "Bangkok, Thailand", 
    "Melbourne, Australia"
  ]);


  /*useEffect(() => guidesServices
  .getAllGuides()
  .then(lst => console.log(lst))
  , []);
  /*
  useEffect(() => citiesServices
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
    setUser(SAMPLE_USER);
    setAlert(false);
  }

  const logout = () => {
    setAuth(false);
    setUser(null);
    setAlert(false);
    setPage('home');
  }

  const pageHandler = x => () => {
    setPage(x);
    setAlert(false);
  }

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
      citiesList={citiesList}
      />
      {showAlert && 
        <Alert variant='danger'>
            Please select a valid city from the dropdown list.
        </Alert>
      }
      <div className="main">
      {currPage === "home" &&
        <Home cityHandler={cityHandler} citiesList={citiesList}/>
      }
      {currPage === "city" &&
        <CityPage city={currCity} />
      }
      {currPage === "profile" &&
        <Profile currencies={currencies} citiesList={citiesList} user={user} logoutHandler={logout}/>
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
