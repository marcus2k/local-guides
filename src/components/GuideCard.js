import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const GuideCard = props => {
    const { guideData } = props;
    const { name, gender, hourlyRate, transport, languages, intro, email, mobile } = guideData;
    
    // const profilePhoto = <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />

    return (
        <Card key={email} style={{ textAlign: "center", width: 900,  marginLeft: 15, marginRight: 15, marginTop: 15, marginBottom: 10}}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {intro}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
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
          <ListGroupItem><strong>Languages:</strong> {languages.join(", ")}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
          <Card.Link target="_blank" href={`mailto:${email}`}>{email}</Card.Link>
          <Card.Link target="_blank" href={`tel:${mobile}`}>{mobile}</Card.Link>
          </div>
        </Card.Body>
        </Card>
    )
}

export default GuideCard;