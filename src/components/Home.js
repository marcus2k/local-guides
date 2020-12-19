import React from 'react';
import CityForm from './CityForm';

const Home = (props) => {
    const { cityHandler, citiesList } = props;

    return (
        <>
            <h1>Where to next?</h1>
            <CityForm 
            isMain={true}
            cityHandler={cityHandler}
            citiesList={citiesList}
            />
        </>
    )
}

export default Home;