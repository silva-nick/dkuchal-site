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
        <h2 style={{ ...hs, marginBottom: "30%" }}>
          [Mental Wellness Challenge]
        </h2>
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
        <Jumbotron style={{ padding: "2rem 0.5rem" }} fluid>
          <Container>
            <p style={{ fontWeight: "bold" }}>
              DKU CAPS Mental Wellness Challenge is a program for students
              everywhere to learn about their mental health.
            </p>
            <p>
              This 30-day program aims to promote and nurture positive mental
              health and happiness in DKU community. We invite pairs of students
              to participate in this program, so we can maintain and improve the
              connections between different student populations.
            </p>
          </Container>
        </Jumbotron>

        <p>
          This program will cover different areas that contribute to students’
          mental health and personal development, including mental health,
          physical health, friendship, fun and hobby and cultural exchange. If
          you have any question or further inquiry, please email us at
          dkumwchallenge@outlook.com.
        </p>

        <Card>
          <Card.Header>Key Dates</Card.Header>
          <Card.Body>
            <Card.Text>
              <a style={{ fontWeight: "bold" }}>Sign-up</a>: March 23-27
            </Card.Text>
            <Card.Text>
              <a style={{ fontWeight: "bold" }}>Pairing</a>: March 28-30
            </Card.Text>
            <Card.Text>
              <a style={{ fontWeight: "bold" }}>Program</a>: April 1-30
            </Card.Text>
            <Card.Text>
              <a style={{ fontWeight: "bold" }}>Award delivery</a>: May (please
              consult with admin team for more details)
            </Card.Text>
          </Card.Body>
        </Card>
        <br />

        <p>
          This program is to encourage you and your partner to try out new tasks
          and build connections. If you have disagreements with your partner, we
          encourage you to talk it through with your partner. We encourage you
          talk about the tasks you prefer and how to work on disagreement with
          your partner when you sign up.
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
