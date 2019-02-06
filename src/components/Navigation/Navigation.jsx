import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <div className="container">
            <LinkContainer to="/">
                <Navbar.Brand >Invoice App</Navbar.Brand>
            </LinkContainer>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/products">
                        <Nav.Link>Products</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/customers">
                        <Nav.Link>Customers</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default Navigation;
