import "../../App.css";
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

function LoginPage() {
  return (
    <div>
      <center>
        <NavBar />
      </center>
      <Container>
        <Card className="text-left" style={{ margin: "10% 0" }}>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
            <Button variant="primary">Sign in</Button>
          </Card.Body>
          <Card.Footer className="text-muted">
            Don't have an account? <a>Sign up here.</a>
          </Card.Footer>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default LoginPage;
