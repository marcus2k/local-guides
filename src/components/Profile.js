import React, { useState } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';

const sortThenObjectify = lst => lst.sort((a, b) => a > b ? 1 : -1).map(x => ({value: x, label: x}));

const NAME_ERROR = "Name must be at least 3 characters."

const MOBILE_ERROR = "Mobile must consist of at least 8 numeric characters."

const CITIES_ERROR = "You must select at least one city."

const LANG_ERROR = "You must select at least one language."

const isValidName = name => name.length > 2;

const isValidMobile = mobile => mobile.match(/^[0-9]+$/) && mobile.length > 7;

const isValidCities = cities => cities.length > 0;

const isValidLanguages = lang => lang.length > 0;

const FORM_PROPS = [ "name", "intro", "currency", "hourlyRate", "email", "mobile", "transport", "cities", "languages" ];

const Profile = (props) => {
    const { currencies, citiesList } = props;
    const profile = 
    { // sampleData
        name: "Billie",
        cities: ["Bangkok, Thailand"],
        hourlyRate: ["THB", 40],
        transport: 3,
        languages: ["English", "Thai"],
        intro: "Hi, my name is Billie",
        email: "billie@example.com",
        mobile: "6139482193",
    };
    const [ formState, setFormState ] = useState(profile)
    const [ nameError, setNameError ] = useState(false); // should be at least 3 chars and at most 20 chars
    const [ mobileError, setMobileError ] = useState(false); 
    const [ citiesError, setCitiesError ] = useState(false); // at least one
    const [ langError, setLangError ] = useState(false); // at least one
    const [ showSuccess, setSuccess ] = useState(false);
    const [ showError, setError ] = useState(false);

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
        const isSuccess = isValidName(name) && isValidCities(cities) && isValidLanguages(languages) && isValidCities(mobile);
        isSuccess ? setSuccess(true) : setSuccess(false);
        isSuccess ? setError(false) : setError(true);
        setTimeout(() => {
            setLangError(false);
            setCitiesError(false);
            setNameError(false);
            setCitiesError(false);
            setSuccess(false);
            setError(false);
        }, 5000);
        isSuccess ? setFormState(newProfile) : setFormState({...formState});
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
            {showError && 
            <Alert variant="danger">
                {nameError && <div>{NAME_ERROR}</div>}
                {mobileError && <div>{MOBILE_ERROR}</div>}
                {citiesError && <div>{CITIES_ERROR}</div>}
                {langError && <div>{LANG_ERROR}</div>}
            </Alert>
            }
            {(showSuccess) && 
                <Alert variant="success">
                    Profile saved successfully.
                </Alert>
            }
            <h4 className="profile-header">My Guide Profile</h4>
            <Form style={{margin: 30}} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control maxlength="20" type="name" defaultValue={formState.name} /> {/*isInvalid={nameError}/>
                        <Form.Control.Feedback type="invalid">
                            Must be at least 3 characters.
                        </Form.Control.Feedback>*/}
                    </Form.Group>
                    <Form.Group as={Col} controlId="mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control maxlength="15" type="text" defaultValue={formState.mobile} /> {/*isInvalid={mobileError} />
                        <Form.Control.Feedback type="invalid">
                            Must be at least 8 numeric digits.
                        </Form.Control.Feedback>*/}
                    </Form.Group>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control disabled type="email" defaultValue={formState.email} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="transport">
                    <Form.Label>Transport</Form.Label>
                    <Form.Control type="number" min="0" defaultValue={formState.transport} placeholder="No. of guests" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="hourlyRate">
                        <Form.Label>Hourly Rate</Form.Label>
                        <Form.Control min="0" type="number" defaultValue={formState.hourlyRate[1]} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="currency">
                        <Form.Label>Currency</Form.Label>
                        <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={{label:formState.hourlyRate[0], value:formState.hourlyRate[0]}}
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
                        style={{ borderColor: citiesError ? "#b94a48" : "#aaa"}}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select at least one city"
                        defaultValue={sortThenObjectify(formState.cities)}
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
                        placeholder="Select at least one language"
                        defaultValue={sortThenObjectify(formState.languages)}
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
                    <Form.Control maxlength="200" as="textarea" type="text" defaultValue={formState.intro} />
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