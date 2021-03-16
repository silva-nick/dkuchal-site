import "./Home.css";
import { React, useState, useEffect } from "react";
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
import MainBackground from "./img/schedule-background-md.jpg";
//import MainBackgroundSmall from "./img/schedule-background-sm.jpg";

function Home() {
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
    let hs = {
      color: "#fff",
    };

    headerText = (
      <center>
        {" "}
        <h4 style={{ ...hs, marginTop: "-25%" }}>Duke Kunshan University</h4>
        <p style={{ ...hs, fontSize: "large" }}>[CAPS Challenge]</p>
      </center>
    );
  } else {
    let hs = {
      left: "40%",
      color: "#fff",
    };

    headerText = (
      <center>
        {" "}
        <h1 style={{ ...hs, fontSize: "xxx-large", marginTop: "-40%" }}>
          Duke Kunshan University
        </h1>
        <h2 style={{ ...hs, marginBottom: "30%" }}>[Mental Wellness Challenge]</h2>
      </center>
    );
  }

  return (
    <div>
      <NavBar />

      <Container>
        <div>
          <Image
            src={MainBackground}
            style={{ backgroundSize: "cover" }}
            fluid
          />
          {headerText}
        </div>
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
              <Card.Body>Contact us: dkumwchallenge@outlook.com</Card.Body>
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
