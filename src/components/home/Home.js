import "./Home.css";
import React from "react";
import {
  Container,
  Image,
  Alert,
  Jumbotron,
  Accordion,
  Card,
  ListGroup,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";
import MainBackground from "./img/schedule-background.jpg";

function Home() {
  console.log(window.innerWidth);

  let headerText = {
    position: "absolute",
    left: "30%",
    color: "#fff",
  };

  return (
    <div>
      <center>
        <NavBar />
      </center>
      <Container>
        <div>
          <Image
            src={MainBackground}
            style={{
              backgroundSize: "cover",
              marginTop: "5%",
            }}
            fluid
          />
          <h1 style={{ ...headerText, top: "40%" }}>Duke Kunshan University</h1>
          <h2 style={{ ...headerText, top: "45%" }}>[Challenge 2.0]</h2>
        </div>
        <br />
        <h3>What is DKU Challenge 2.0</h3>
        <Jumbotron fluid>
          <Container>
            <p>DKU Challenge 2.0 is a program for students.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Container>
        </Jumbotron>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h3>FAQ</h3>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              How do I sign up?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>blah blah blah</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Can I choose my own Partner?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>blah blah</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              More questions:
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>blah blah!!</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <br />
        <h3>Rules</h3>
        <p>To qualify for the competition you have to follow these rules.</p>
        <ListGroup variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>
        <br />
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
