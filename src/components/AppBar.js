import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const AppBar = (props) => {
    const { isAuthed, loginHandler, logoutHandler } = props;

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Local Guides</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            { !isAuthed && <Nav.Link onClick={loginHandler}>Login</Nav.Link> }
            { isAuthed &&
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Guide Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" disabled>Inbox</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" disabled>Bookings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
            }
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Enter a city..." className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default AppBar;