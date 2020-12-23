import React, { useState } from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';

const CityForm = (props) => {
    const { cityHandler, isMain, citiesList } = props;
    const [ searchText, setSearchText ] = useState('');

    const updateSearchText = event => {
        setSearchText(event.target.value);
    }

    console.log(citiesList);

    const formSize = isMain ? "lg" : "";

    return (
        <>
            <Form size={formSize} inline onSubmit={cityHandler(searchText)}>
                <FormControl size={formSize} type="text" defaultValue="" onChange={updateSearchText} placeholder="Enter a city..." className="mr-sm-2" />
                <Button size={formSize} variant="outline-primary" type="submit">Search</Button>
            </Form>
        </>
    )
}

export default CityForm;