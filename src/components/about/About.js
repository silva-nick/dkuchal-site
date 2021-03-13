import { React, useState, useEffect } from "react";
import {
  Container,
  Image,
  Jumbotron,
  Accordion,
  Card,
  ListGroup,
} from "react-bootstrap";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";
import MainBackground from "./img/event-background.jpg";
import CapsLogo from "../navigation/caps-logo.svg";
//import MainBackgroundSmall from "./img/schedule-background-sm.jpg";

function About() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  let headerText;

  if (width < 500) {
    headerText = (
      <center>
        {" "}
        <h4 style={{ marginTop: ".4rem" }}>Duke Kunshan University</h4>
        <p style={{ fontSize: "large" }}>[CAPS Challenge]</p>
      </center>
    );
  } else {
    headerText = (
      <div>
        {" "}
        <h1 style={{ fontSize: "xxx-large", marginTop: "1rem" }}>
          Counseling and Psychological Services
        </h1>
        <h2>About Us</h2>
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <Container>
        {headerText}

        <br />
        <h3>What is DKU Challenge 2.0</h3>
        <Jumbotron fluid>
          <Container>
            <p style={{ fontWeight: "bold" }}>
              DKU CAPS Mental Wellness Challenge is a program for students.
            </p>
            <p>
              The goal of this event is to add opportunities for DKU students to
              make new foreign friends or to maintain their old friendship
              overseas. Though we are apart during this special difficult
              period, students can still keep active and accompany each other
              via this meaningful online program.
            </p>
          </Container>
        </Jumbotron>

        <Card>
          <Card.Img
            variant="top"
            src={MainBackground}
            style={{ backgroundSize: "cover" }}
          />
          <Card.Body>
            <Card.Text>A mental wellness event held Fall 2020.</Card.Text>
          </Card.Body>
        </Card>

        <br />

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
              <Card.Body>
                Link to a form <a href="https://www.google.com">here!</a>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Can I choose my own Partner?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                We will create a Qualtrics or Airtable form/ questionnaire that
                is designed to help create pairs of students. This form/
                questionnaire will collect the students general information,
                their interests, and some other characteristics that may be
                useful in assigning them a partner. Using this data we will
                create an email list. Then we will pair the students manually
                and release submissions via the list.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              More questions:
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>Contact us: zaiying.yang@dukekunshan.edu.cn</Card.Body>
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

export default About;
