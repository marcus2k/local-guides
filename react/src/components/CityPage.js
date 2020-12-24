import React, { useEffect, useState } from 'react';
import GuideList from './GuideList';
import guidesServices from '../services/guides';

const CityPage = (props) => {
    const { city } = props;
    const [ guideList, setList ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    useEffect(() => {
        setLoading(true);
        guidesServices
        .getCityGuides(city)
        .then(r => {
            console.log(r);
            setList(r);
            setLoading(false);
        });
    }
    , [city]);
    const hasGuides = guideList.length !== 0;

    return (
        <div>
            <h2 className="city-header">Tour Guides at: {city}</h2>
            {!loading && hasGuides && <GuideList list={guideList} />}
            {loading && <h4><br /><br />Loading...</h4>}
            {!hasGuides && !loading && <h4><br /><br />No tour guides found :(</h4>}
        </div>
    )
}

export default CityPage;