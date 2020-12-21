import React from 'react';
import GuideList from './GuideList';

const sampleGuideData = [
    {
        name: "Ivanka",
        gender: "F",
        city: "Singapore, Singapore",
        hourlyRate: ["SGD", 70],
        transport: 0,
        languages: ["English"],
        intro: "Hi, my name is Ivanka",
        email: "ivanka@example.com",
        mobile: "6589482193",
    },
    {
        name: "Budi",
        gender: "M",
        city: "Bali, Indonesia",
        hourlyRate: ["IDR", 100000],
        transport: 3,
        languages: ["English", "Indonesian"],
        intro: "Hi, my name is Budi",
        email: "budi@example.com",
        mobile: "628189482193",
    },
    {
        name: "Chen Long", // yes
        gender: "M", 
        city: "Melbourne, Australia",
        hourlyRate: ["AUD", 400], // yes
        transport: 0, // yes
        languages: ["Chinese", "English"],
        intro: "Hi, my name is Chen Long, call me Jackie!",
        email: "jackie@example.com",
        mobile: "6139482193",
    },
    {
        name: "Albert Pozowski", // yes
        gender: "M", 
        city: "Melbourne, Australia",
        hourlyRate: ["AUD", 400], // yes
        transport: 0, // yes
        languages: ["Chinese", "English"],
        intro: "Hi, my name is Chen Long, call me Jackie!",
        email: "albert@example.com",
        mobile: "6139482193",
    },
    {
        name: "Pauline Meadows", // yes
        gender: "M", 
        city: "Melbourne, Australia",
        hourlyRate: ["AUD", 400], // yes
        transport: 0, // yes
        languages: ["Chinese", "English"],
        intro: "Hi, my name is Chen Long, call me Jackie!",
        email: "pauline@example.com",
        mobile: "6139482193",
    },
    {
        name: "Paul Blackbeard", // yes
        gender: "M", 
        city: "Melbourne, Australia",
        hourlyRate: ["AUD", 400], // yes
        transport: 0, // yes
        languages: ["Chinese", "English"],
        intro: "Hi, my name is Chen Long, call me Jackie!",
        email: "paul@example.com",
        mobile: "6139482193",
    },
    {
        name: "Billie",
        gender: "F",
        city: "Bangkok, Thailand",
        hourlyRate: ["THB", 40],
        transport: 3,
        languages: ["English", "Thai"],
        intro: "Hi, my name is Billie",
        email: "billie@example.com",
        mobile: "6139482193",
    }
]

const filterGuides = (city, guideList) => guideList.filter(guide => guide.city === city);

const CityPage = (props) => {
    const { city } = props;
    const guideList = filterGuides(city, sampleGuideData);
    const hasGuides = guideList.length !== 0;

    return (
        <div>
            <h2 className="city-header">Tour Guides at: {city}</h2>
            {hasGuides && <GuideList list={guideList} />}
            {!hasGuides && <h4><br /><br />No tour guides found :(</h4>}
        </div>
    )
}

export default CityPage;