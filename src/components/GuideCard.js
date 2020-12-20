import React from 'react';
import { Card, ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

const GuideCard = props => {
    const { guideData } = props;
    const { name, gender, hourlyRate, transport, languages, intro, email, mobile } = guideData;
    const [ showModal, setModal ] = useState(false);

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);
    
    // const profilePhoto = <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />

    return (
        <>
            <Card key={email} style={{ textAlign: "center", width: 900,  marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 10}}>
                <Card.Header>
                <Card.Title>{name}</Card.Title>
                </Card.Header>
                <ListGroup className="list-group-flush">
                <ListGroupItem><strong>Languages:</strong> {languages.join(", ")}</ListGroupItem>
                <ListGroupItem>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                        <div>
                        <strong>Guide Fee:</strong> {hourlyRate.join(" ")} / hour
                        </div>
                        <div>
                        <strong>Transport:</strong> {transport ? transport + " pax" : "No"}
                        </div>
                    </div>
                </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button variant="primary" onClick={openModal}>More Info</Button>
                </Card.Body>
            </Card>
            <Modal
            show={showModal}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title>{name}'{name.toLowerCase().endsWith('s') ? '' : 's'} Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {intro}
                </Modal.Body>
                <Modal.Body>
                <strong>Email: </strong><a target="_blank" href={`mailto:${email}`}>{email}</a><br/>
                <strong>Mobile: </strong><a target="_blank" href={`tel:${mobile}`}>{mobile}</a>
                </Modal.Body>
                <Modal.Footer>
                <Button disabled variant="secondary">
                    Make an Appointment
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default GuideCard;