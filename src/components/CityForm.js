import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const CityForm = (props) => {
    const { cityHandler, isMain } = props;
    const [ searchText, setSearchText ] = useState('');

    const updateSearchText = event => {
        setSearchText(event.target.value);
    }

    return (
        <>
            {!isMain &&
                <Form inline onSubmit={cityHandler(searchText)}>
                    <FormControl type="text" defaultValue="" onChange={updateSearchText} placeholder="Enter a city..." className="mr-sm-2" />
                    <Button variant="outline-primary" type="submit">Search</Button>
                </Form>
            }
            {isMain &&
                <Form inline onSubmit={cityHandler(searchText)}>
                    <FormControl type="text" defaultValue="" onChange={updateSearchText} placeholder="Enter a city..." className="mr-sm-2" />
                    <Button variant="outline-primary" type="submit">Search</Button>
                </Form>
            }
        </>
    )
}

export default CityForm;