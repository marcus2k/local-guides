import React, { useEffect, useState } from 'react';
import GuideList from './GuideList';
import guidesServices from '../services/guides';

const filterGuides = (city, guideList) => guideList.filter(guide => guide.city.includes(city));

const CityPage = (props) => {
    const { city, guides } = props;
    //const guideList = filterGuides(city, guides);
    const [ guideList, setList ] = useState([]);
    useEffect(() => guidesServices
        .getCityGuides(city)
        .then(r => {
            console.log(r);
            setList(r);
        })
    , []);
    const hasGuides = guideList.length !== 0;

    return (
        <div>
            <h2 className="city-header">Tour Guides at: {city}</h2>
            {hasGuides && <GuideList list={guideList} />}
            {/*!hasGuides && <h4><br /><br />No tour guides found :(</h4>*/}
        </div>
    )
}

export default CityPage;