import React, { useEffect, useState } from 'react';
import { Form, Col, Button, Alert, Modal } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable'
import guidesServices from '.././services/guides';

const sortThenObjectify = lst => lst.sort((a, b) => a > b ? 1 : -1).map(x => ({value: x, label: x}));

const NAME_ERROR = "Name must be at least 3 characters."

const MOBILE_ERROR = "Mobile must consist of at least 8 numeric digits."

const EMPTY_ERROR = "Required fields must not be empty."

const isValidName = name => ![1, 2].includes(name.length);

const isValidMobile = mobile => (mobile.match(/^[0-9]+$/) && mobile.length > 7) || mobile.length === 0;

const FORM_PROPS = [ "id", "name", "intro", "currency", "hourlyRate", "email", "mobile", "transport", "cities", "languages" ];

const Required = () => <span className="required">*</span>;

const BLANK_STATE = email =>
({
    id: "",
    name: "",
    gender: "",
    cities: [],
    hourlyRate: ["", ""],
    transport: "",
    languages: [],
    intro: "",
    email: email,
    mobile: "",
});

const Profile = (props) => {
    const { user, deleteHandler, saveHandler, isBlank, email } = props;
    const [ formState, setFormState ] = useState(isBlank ? BLANK_STATE(email) : user);
    const [ nameError, setNameError ] = useState(false); // should be at least 3 chars and at most 20 chars
    const [ mobileError, setMobileError ] = useState(false); 
    const [ emptyError, setEmptyError ] = useState(false); // at least one
    const [ showSuccess, setSuccess ] = useState(false);
    const [ showError, setError ] = useState(false);
    const [ showModal, setModal ] = useState(false);
    const [ citiesList, setCitiesList ] = useState([]);
    const [ citiesLoading, setCitiesLoading ] = useState(false);
    const [ currLoading, setCurrLoading ] = useState(false);
    const [ langLoading, setLangLoading ] = useState(false);
    const [ currencies, setCurrencies ] = useState([]);
    const [ languages, setLanguages ] = useState([]);
    
    useEffect(() => {
        setCitiesLoading(true);
        guidesServices
        .getAllCities()
        .then(lst => {
            console.log(lst);
            setCitiesList(lst);
            setCitiesLoading(false);
        });
    }, []);

    useEffect(() => {
        setCurrLoading(true);
        guidesServices
        .getCurrencies()
        .then(lst => {
            console.log(lst);
            setCurrencies(lst);
            setCurrLoading(false);
        })
    }, [])

    useEffect(() => {
        setLangLoading(true);
        guidesServices
        .getLanguages()
        .then(lst => {
            console.log(lst);
            setLanguages(lst);
            setLangLoading(false);
        })
    }, [])

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
        if (isSuccess) {
            isBlank ? guidesServices.addUser(obj.email, obj) : guidesServices.updateUserProfile(obj.email, obj);
            setFormState(obj);
            saveHandler(obj);
        } else {
            setFormState({...formState});
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const [ name, intro, currency, rate, email, mobile, transport ] = 
            [ form.name, form.intro, form.currency, form.hourlyRate, form.email, form.mobile, form.transport ]
            .map(obj => obj.value);
        console.log("forms state email is ", email);
        const [ cities, languages ] = [ form.cities, form.languages ]
            .map(radioArr => radioArr.value ? [].concat(radioArr.value) : Array.from(radioArr).map(node => node.defaultValue));
        const newProfile = { 
            id: "0",
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

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    console.log("current form state is ", formState);

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
                        <Form.Label>Email<Required /></Form.Label>
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
                        <CreatableSelect
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={{label:formState.hourlyRate[0], value:formState.hourlyRate[0]}}
                        isDisabled={false}
                        isLoading={currLoading}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="currency"
                        options={sortThenObjectify(currencies)}
                        onChange={void(0)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="cities">
                        <Form.Label >Cities<Required /></Form.Label>
                        <CreatableSelect
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select at least one city"
                        defaultValue={sortThenObjectify(formState.cities)}
                        isMulti
                        isDisabled={false}
                        isLoading={citiesLoading}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="cities"
                        options={sortThenObjectify(citiesList)}
                        onChange={void(0)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="languages">
                        <Form.Label>Languages<Required /></Form.Label>
                        <CreatableSelect
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="Select at least one language"
                        defaultValue={sortThenObjectify(formState.languages)}
                        isMulti
                        isDisabled={false}
                        isLoading={langLoading}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="languages"
                        options={sortThenObjectify(languages)}
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
                        <Button variant="success" type="submit" className="mr-sm-2">Save Profile</Button>
                        {!isBlank && <Button variant="danger" onClick={openModal} className="ml-sm-2">Delete Profile</Button>}
                    </Form.Group>
                </Form.Row>
            </Form>
            {showModal &&
            <Modal
            show={showModal}
            onHide={closeModal}
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Delete your account permanently?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your profile will be permanently removed from our database of guides.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={deleteHandler}>
                    Confirm Deletion
                </Button>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
            }
        </>
    )
}

export default Profile;