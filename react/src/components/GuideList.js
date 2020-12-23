import React from 'react';
import GuideCard from './GuideCard';

const GuideList = (props) => {
    const { list } = props;

    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
            {list.map(g => <GuideCard key={g.name} guideData={g} />)}
        </div>
    )
}

export default GuideList;