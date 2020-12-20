import React from 'react';
import CitySearch from './CitySearch';

const Home = (props) => {
    const { cityHandler, citiesList } = props;

    return (
        <div className="main">
            <h1>Where to next?</h1>
            <CitySearch 
            isMain={true}
            cityHandler={cityHandler}
            citiesList={citiesList}
            />
        </div>
    )
}

export default Home;