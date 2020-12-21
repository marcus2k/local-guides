import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import Select from 'react-select';

const sortThenObjectify = lst => lst.sort((a, b) => a > b ? 1 : -1).map(x => ({value: x, label: x}));

const NAME_ERROR = "Name should be between 3 and 20 characters, inclusive."

const RATE_ERROR = "Rate must be non-negative integers."

const INTRO_ERROR = "Introduction must be at most 200 characters."

const CITIES_ERROR = "You must select at least one city."

const LANG_ERROR = "You must select at least one language."

const isValidName = name => name.length > 2;

const isValidMobile = mobile => mobile.match(/^[0-9]+$/) && mobile.length > 7;

const isValidCities = cities => cities.length > 0;

const isValidLanguages = lang => lang.length > 0;

const FORM_PROPS = [ "name", "intro", "currency", "hourlyRate", "email", "mobile", "transport", "cities", "languages" ];

const Profile = (props) => {
    const { currencies, citiesList } = props;
    const [ formState, setFormState ] = useState("")
    const [ nameError, setNameError ] = useState(false); // should be at least 3 chars and at most 20 chars
    const [ rateError, setRateError ] = useState(false); // should be at least 0, no cents allowed?
    const [ mobileError, setMobileError ] = useState(false); 
    const [ citiesError, setCitiesError ] = useState(false); // at least one
    const [ langError, setLangError ] = useState(false); // at least one

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const [ name, intro, currency, rate, email, mobile, transport ] = 
            [ form.name, form.intro, form.currency, form.hourlyRate, form.email, form.mobile, form.transport ]
            .map(obj => obj.value);
        const [ cities, languages ] = [ form.cities, form.languages ]
            .map(radioArr => radioArr.value ? [].concat(radioArr.value) : Array.from(radioArr).map(node => node.defaultValue));
        const newProfile = { 
            name: name, 
            intro: intro, 
            hourlyRate: [currency, rate], 
            email: email, 
            cities: cities, 
            languages: languages,
            mobile: mobile,
            transport: transport,
        };
        isValidName(name) ? setNameError(false) : setNameError(true);
        isValidCities(cities) ? setCitiesError(false) : setCitiesError(true);
        isValidLanguages(languages) ? setLangError(false) : setLangError(true);
        isValidMobile(mobile) ? setMobileError(false) : setMobileError(true);
        console.log(name);
        console.log(intro);
        console.log(currency);
        console.log(rate);
        console.log(email);
        console.log(cities);
        console.log(languages);
        console.log(newProfile);
    }

    return (
        <>
            <h4 className="profile-header">My Guide Profile</h4>
            <Form style={{margin: 30}} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control maxlength="20" type="name" defaultValue="currentName" isInvalid={nameError}/>
                        <Form.Control.Feedback type="invalid">
                            Must be at least 3 characters.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control maxlength="15" type="text" isInvalid={mobileError} defaultValue="+6593847382" />
                        <Form.Control.Feedback type="invalid">
                            Must be at least 8 numeric digits.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control disabled type="email" defaultValue="currentEmail@example.com" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="transport">
                    <Form.Label>Transport</Form.Label>
                    <Form.Control type="number" min="0" default={0} placeholder="No. of guests" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="hourlyRate">
                        <Form.Label>Hourly Rate</Form.Label>
                        <Form.Control min="0" type="number" default={0} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="currency">
                        <Form.Label>Currency</Form.Label>
                        <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={{label:"USD", value:"USD"}}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={false}
                        name="currency"
                        options={sortThenObjectify(currencies)}
                        onChange={void(0)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="cities">
                        <Form.Label >Cities</Form.Label>
                        <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select your cities"
                        defaultValue="Singapore, Singapore"
                        isMulti
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={false}
                        name="cities"
                        options={sortThenObjectify(citiesList)}
                        onChange={void(0)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="languages">
                        <Form.Label>Languages</Form.Label>
                        <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select your languages"
                        defaultValue="English"
                        isMulti
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={false}
                        name="languages"
                        options={sortThenObjectify(["English", "Spanish", "Chinese", "Hindi", "Russian"])}
                        onChange={void(0)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="intro">
                    <Form.Label>Brief Introduction</Form.Label>
                    <Form.Control maxlength="200" as="textarea" type="text" defaultValue={"dummy ".repeat(5)} />
                </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Button variant="success" type="submit" className="mr-sm-2">Save Changes</Button>
                        <Button variant="danger" className="ml-sm-2">Delete Account</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}

export default Profile;