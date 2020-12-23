import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import guidesServices from '.././services/guides';

const objectify = lst => lst.sort((a, b) => a > b ? 1 : -1).map(city => ({value: city, label: city}));

const CitySearch = (props) => {
    const { cityHandler } = props;
    const [ selected, setSelected ] = useState('');
    const [ citiesList, setCitiesList ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        guidesServices
        .getAllCities()
        .then(lst => {
            console.log(lst);
            setCitiesList(lst);
            setLoading(false);
        });
    }, []);
    
    const updateSelected = newSelected => {
        if (!newSelected) {
            setSelected('');
            return;
        }
        console.log(newSelected);
        setSelected(newSelected.value);
    }

    console.log(citiesList);

    const objectifiedCitiesList = objectify(citiesList);

    return (
        <Form inline onSubmit={cityHandler(selected)} >
            <div style={{ alignSelf: 'center', display: 'inline-block', width: 300 }}>
                <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder="Enter a city"
                defaultValue={""}
                isDisabled={false}
                isLoading={loading}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="color"
                options={objectifiedCitiesList}
                onChange={updateSelected}
                />
            </div>
            <Button size="" variant="outline-primary" type="submit" className="ml-sm-2">Search</Button>
        </Form>
    );
}

export default CitySearch;