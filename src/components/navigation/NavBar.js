import "./Navigation.css";
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "./Logo";

function NavBar() {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light" fixed="top">
        <Navbar.Brand as={Link} to="/" style={{ width: "2rem" }}>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/tasks">
              Tasks
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Shop
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavBar;
