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
        <h1 style={{ marginTop: "1.5rem" }}>
          Counseling and Psychological Services
        </h1>
        <h3 style={{ marginTop: "1rem" }}>About us</h3>
        <hr />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <Container>
        {headerText}

        <p style={{ padding: "1rem" }}>
          With the hard work and generous support of CAPS and ISS student
          workers, CAPS has the opportunity to invite you to participate in this
          DKU Mental Wellness Challenge. This 30-day program aims to promote and
          nurture positive mental health and happiness in DKU community. We
          invite pairs of students to participate in this program, so we can
          maintain and improve the connections between different student
          populations. We wish you a pleasant journey with your partner in this
          program. For more information of CAPS services, please visit our
          website https://dukekunshan.edu.cn/en/caps
          <a href="https://dukekunshan.edu.cn/en/caps">
            {" "}
            https://dukekunshan.edu.cn/en/caps
          </a>
          .
        </p>

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

        <Card>
          <Card.Header>What is DKU CAPS</Card.Header>
          <Card.Body>
            <Card.Title>
              {" "}
              CAPS provides face-to-face counseling service to students on
              campus and virtual counseling service to students who cannot
              travel back to campus.{" "}
            </Card.Title>
            <Card.Text>
              CAPS is committed to creating an environment that is educationally
              inspiring, physically and psychologically safe, and accessible and
              accepting of all gender expressions and identities, of all races,
              ethnicities, nationalities, faith communities and sexual
              orientations. CAPS aims to provide excellent assistance to the
              distressed and injured, aid in eradicating those situations and
              conditions that result in psychological problems, and will promote
              and nurture positive mental health and happiness on the Duke
              Kunshan campus.
            </Card.Text>
          </Card.Body>
        </Card>

        <br />

        <Card>
          <Card.Body>
            <Card.Title>CAPS During Covid-19</Card.Title>
            There is much beyond our control during the COVID-19 pandemic. If
            you find yourself feeling anxious and overwhelmed, you are not
            alone. We hope the following online resources will provide you some
            calm, insight and connection. Together, we can get through this!
            Here is a universal mantra for us: "This, too shall pass."
          </Card.Body>
          <Card.Footer className="text-muted">
            Want more information{" "}
            <a href="https://dukekunshan.edu.cn/en/caps/online-resources-virtual-mental-health-support">
              Check it out here.
            </a>
          </Card.Footer>
        </Card>
        <br />

        <h3>CAPS Information</h3>
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Working Hours
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>9:00-12:00, 13:00-17:30 (Monday-Friday)</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Phone
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>+86-0512-3665-7829</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Email
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>caps@dukekunshan.edu.cn</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              After-hours Hotline
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>+86-0512-3665-7110</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <br />
      </Container>
      <Footer />
    </div>
  );
}

export default About;
