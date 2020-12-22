import React, { useState } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';

const sortThenObjectify = lst => lst.sort((a, b) => a > b ? 1 : -1).map(x => ({value: x, label: x}));

const NAME_ERROR = "Name must be at least 3 characters."

const MOBILE_ERROR = "Mobile must consist of at least 8 numeric digits."

const EMPTY_ERROR = "Required fields must not be empty."

const isValidName = name => ![1, 2].includes(name.length);

const isValidMobile = mobile => (mobile.match(/^[0-9]+$/) && mobile.length > 7) || mobile.length === 0;

const FORM_PROPS = [ "name", "intro", "currency", "hourlyRate", "email", "mobile", "transport", "cities", "languages" ];

const Required = () => <span className="required">*</span>;

const Profile = (props) => {
    const { currencies, citiesList, user } = props;
    const [ formState, setFormState ] = useState(user)
    const [ nameError, setNameError ] = useState(false); // should be at least 3 chars and at most 20 chars
    const [ mobileError, setMobileError ] = useState(false); 
    const [ emptyError, setEmptyError ] = useState(false); // at least one
    const [ showSuccess, setSuccess ] = useState(false);
    const [ showError, setError ] = useState(false);

    const validate = obj => {
        const objCopy = {...obj};
        delete objCopy.intro;
        console.log(obj.cities.length === 0);
        const reqIsNotEmpty = !Object.values(objCopy).filter(prop => prop === "" || prop.length === 0).length && !obj.hourlyRate.includes("");
        isValidMobile(obj.mobile) ? setMobileError(false) : setMobileError(true);
        isValidName(obj.name) ? setNameError(false) : setNameError(true);
        reqIsNotEmpty ? setEmptyError(false) : setEmptyError(true);
        const isSuccess = isValidName(obj.name) && isValidMobile(obj.mobile) && reqIsNotEmpty;
        isSuccess ? setSuccess(true) : setSuccess(false);
        isSuccess ? setError(false) : setError(true);
        setTimeout(() => {
            setMobileError(false);
            setNameError(false);
            setEmptyError(false);
            setSuccess(false);
            setError(false);
        }, 5000);
        isSuccess ? setFormState(obj) : setFormState({...formState});
    }
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
        validate(newProfile);
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
                {emptyError && <div>{EMPTY_ERROR}</div>}
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
                        <Form.Label>Name<Required /></Form.Label>
                        <Form.Control maxlength="20" type="name" defaultValue={formState.name} /> {/*isInvalid={nameError}/>
                        <Form.Control.Feedback type="invalid">
                            Must be at least 3 characters.
                        </Form.Control.Feedback>*/}
                    </Form.Group>
                    <Form.Group as={Col} controlId="mobile">
                        <Form.Label>Mobile<Required /></Form.Label>
                        <Form.Control maxlength="15" type="text" defaultValue={formState.mobile} /> {/*isInvalid={mobileError} />
                        <Form.Control.Feedback type="invalid">
                            Must be at least 8 numeric digits.
                        </Form.Control.Feedback>*/}
                    </Form.Group>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email Address<Required /></Form.Label>
                        <Form.Control disabled type="email" defaultValue={formState.email} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="transport">
                    <Form.Label>Transport<Required /></Form.Label>
                    <Form.Control type="number" min="0" defaultValue={formState.transport} placeholder="No. of guests" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="hourlyRate">
                        <Form.Label>Hourly Rate<Required /></Form.Label>
                        <Form.Control min="0" type="number" defaultValue={formState.hourlyRate[1]} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="currency">
                        <Form.Label>Currency<Required /></Form.Label>
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
                        <Form.Label >Cities<Required /></Form.Label>
                        <Select
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
                        <Form.Label>Languages<Required /></Form.Label>
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