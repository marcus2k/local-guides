import React from 'react';
import { Alert } from 'react-bootstrap';
import CitySearch from './CitySearch';

const Home = (props) => {
    const { cityHandler, citiesList, showAlert } = props;

    return (
        <>
            <h1>Where to next?</h1>
            <CitySearch 
            isMain={true}
            cityHandler={cityHandler}
            citiesList={citiesList}
            />
        </>
    )
}

export default Home;