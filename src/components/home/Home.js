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
import MainBackgroundSmall from "./img/schedule-background-sm.jpg";

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
      <center>
        <NavBar />
      </center>

      <Container>
        <div>
          <Image
            src={MainBackground}
            style={{ backgroundSize: "cover", width: "100%" }}
          />
          {headerText}
        </div>
        <br />
        <h3>What is DKU Mental Wellness Challenge</h3>
        <Jumbotron
          style={{ padding: "2rem 0.5rem", marginBottom: "1rem" }}
          fluid
        >
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
                <a href="https://duke.qualtrics.com/jfe/form/SV_ePtZ85N4flD1Njw">
                  Sign up
                </a>{" "}
                on Qualtrics before March 27th 10:00 AM. We invite 39 pairs to
                participate this program. First come first serve. We will send
                out the confirmation email to all the participants around March
                29th. Then your team/pair needs complete the initial task before
                March 31 10:00 PM.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Can I choose my own Partner?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                You can find your own partner or we can pair you up later after
                you complete the sign-up form. Please be noted that local
                students are encouraged to pair up with international students.
                If this pair has one international student and one Chinese
                student (including mainland and HMT students), they can get
                extra 80 points from the beginning.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              What is the initial task?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                Your team/pair needs to create a shared account on this website
                after you receive the confirmation emails. You must upload a
                picture of you and your partner together to activate your
                account before March 31 10:00 PM and you will get 40 points on
                this task.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              How does the scoring work?
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                You will get 40 points once you finish the initial task. If your
                pair has one international student and one Chinese student
                (including mainland and HMT students), you will get extra 80
                points from the beginning. At the end of the program, all
                partnerships will have a net score representing the total number
                of points accrued during the program. Students will then be
                grouped into six prize tiers:
                <ListGroup variant="flush">
                  <ListGroup.Item>First tier: 1 pair</ListGroup.Item>
                  <ListGroup.Item>Second tier: 2 pairs</ListGroup.Item>
                  <ListGroup.Item>Third tier: 3 pairs</ListGroup.Item>
                  <ListGroup.Item>Fourth tier: 4 pairs</ListGroup.Item>
                  <ListGroup.Item>Fifth tier: 8 pairs</ListGroup.Item>
                  <ListGroup.Item>
                    Sixth tier: the rest of the pairs
                  </ListGroup.Item>
                </ListGroup>
                <a style={{ fontWeight: "bold" }}>
                  Competition results will be published through email around
                  April 15th.
                </a>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
              More questions:
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body>Contact us: dkumwchallenge@outlook.com</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <br />
        <h3>Rules</h3>
        <p>To qualify for the competition you have to follow these rules.</p>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <p style={{ fontWeight: "bold" }}>Tasks</p>
            <p>
              There are 30 tasks in total and all the tasks will be posted on
              this website and through emails. Only tasks for the current week
              (1, 2, or 3) will be available at any given time. Each task will
              have a detailed instruction file (.docx/ .pdf) that will be
              accessible through the website or through a backup Box folder in
              case of outages.
            </p>
            <p>April 1-12: Task 1-10</p>
            <p>April 12-19: Task 10-20</p>
            <p>April 19-26: Task 20-30</p>
            <p>April 26-30: Complete the task that you have missed</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p style={{ fontWeight: "bold" }}>Time boundary for tasks</p>
            We have time limits for all the tasks. You need to submit these
            tasks before 11:59 PM on April 11, 19, 26 and 30. During April
            26-30, you will be able to complete the tasks that you have not
            finished in the previous 4 weeks.{" "}
          </ListGroup.Item>
          <ListGroup.Item>
            <p style={{ fontWeight: "bold" }}>Scoring</p>
            Your team will get points once you submit the evidence on the
            website. You can only earn points once for each task. Solid evidence
            (e.g. photo, video, being present until the end of online
            activities) is required to submit in order to verify the completion.
            For online workshop, you need to be present the whole time to get
            the points. Our admin team will track your attendance at the end of
            each activity. For off-line activities, you need to upload the
            evidence on our website. If only one of you complete the task and
            upload the evidence, you pair will get 50% points for that task. But
            we strongly encourage you to complete these challenges together to
            improve mutual understanding and provide mutual support.
          </ListGroup.Item>
          <ListGroup.Item>
            <p style={{ fontWeight: "bold" }}>Guidance on Uploading Evidence</p>
            Max number of files: two images/ documents (.ppt, .pdf, ...) or one
            video. Video Specification: Videos can be submitted via upload or
            link. If you have difficulty uploading files on the website you may:
            (1) use the direct submission form, (2) upload files to Box and send
            shared links, or (3) send your submission to our email
            dkumwchallenge@outlook.com. Please remember to include your name and
            task number in your submission.
          </ListGroup.Item>
        </ListGroup>
        <br />
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
