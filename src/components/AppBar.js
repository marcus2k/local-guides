import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const AppBar = (props) => {
    const { isAuthed, loginHandler, logoutHandler, pageHandler, cityHandler } = props;
    const [ searchText, setSearchText ] = useState('');

    const updateSearchText = event => {
        setSearchText(event.target.value);
    }

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand>Local Guides</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={pageHandler('home')}>Home</Nav.Link>
            { !isAuthed && <Nav.Link onClick={loginHandler}>Login</Nav.Link> }
            { isAuthed &&
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={pageHandler('profile')}>Guide Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" disabled>Inbox</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" disabled>Bookings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
            }
          </Nav>
          <Form inline onSubmit={cityHandler(searchText)}>
            <FormControl type="text" defaultValue="" onChange={updateSearchText} placeholder="Enter a city..." className="mr-sm-2" />
            <Button variant="outline-primary" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default AppBar;