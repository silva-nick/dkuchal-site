import "./Navigation.css";
import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "./Logo";

function NavBar() {
  return (
    <div>
      <Navbar expand="lg" variant="light" bg="light">
        <Navbar.Brand as={Link} to="/" style={{ width: "2rem" }}>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/tasks">
              Tasks
            </Nav.Link>
            <Nav.Link as={Link} to="/leaderboard">
              Leaderboard
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Shop
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/login" style={{ color: "#5289ff" }}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
