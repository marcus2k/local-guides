import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import CitySearch from './CitySearch';

const AppBar = (props) => {
    const { isAuthed, loginHandler, logoutHandler, pageHandler, cityHandler, currPage, citiesList } = props;

    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{userSelect: "none"}}>Local Guides</Navbar.Brand>
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
          {currPage !== "home" &&
            <CitySearch
            isMain={false}
            cityHandler={cityHandler}
            citiesList={citiesList}
            />
          }
        </Navbar.Collapse>
        </Navbar>
    )
}

export default AppBar;