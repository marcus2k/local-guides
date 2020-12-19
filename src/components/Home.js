import React from 'react';
import CityForm from './CityForm';

const Home = (props) => {
    const { cityHandler } = props;

    return (
        <>
            <h1>Where to next?</h1>
            <CityForm 
            isMain={true}
            cityHandler={cityHandler}
            />
        </>
    )
}

export default Home;