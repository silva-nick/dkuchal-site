//import "../../App.css";
import React from "react";
import {
  Container,
  Spinner,
  Card,
  ListGroup,
  Row,
  Col,
  Image,
} from "react-bootstrap";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

import { getSubmissions } from "../../api/api";

class ProfilePage extends React.Component {
  constructor() {
    super();
  }

  state = {
    loading: true,
    submissions: [],
    innerWidth: window.innerWidth,
  };

  componentDidMount = async () => {
    let submissions = await getSubmissions();
    submissions = submissions ? submissions : [];

    this.setState({ loading: false, submissions: submissions });
  };

  componentDidUpdate = () => {
    if (this.state.innerWidth != window.innerWidth) {
      this.setState({ innerWidth: window.innerWidth });
    }
  };

  makeSubmissions() {
    let displayCenter = {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100%",
    };

    let cards = this.state.submissions.map((submission, index) => {
      let symbol = null;
      return (
        <ListGroup.Item key={index}>
          <Row>
            <Col lg={0} xs={0} style={{ paddingRight: 0 }}>
              <div style={{ ...displayCenter, padding: 0 }}>
                {"#" + (index + 1)}
              </div>
            </Col>
            <Col lg={0} xs={0} style={{ ...displayCenter, padding: 0 }}>
              <div>
                <Image
                  src={submission.picture[0].thumbnails.large.url}
                  roundedCircle
                  style={{
                    width: "3rem",
                    height: "3rem",
                    float: "left",
                    margin: 0,
                    objectFit: "cover",
                  }}
                />
              </div>
            </Col>
            <Col lg={10} xs={8}>
              <div style={{ ...displayCenter, lineHeight: ".4rem" }}>
                <p>{submission.nameone + " and " + submission.nametwo}</p>
                <p style={{ color: "#a4a4a4", margin: 0, fontSize: "small" }}>
                  {submission.points + " Points"}
                </p>
              </div>
            </Col>
            {this.state.innerWidth > 500 && (
              <Col lg={0} xs={0}>
                <div style={{ ...displayCenter }}>
                  <div>{symbol}</div>
                </div>
              </Col>
            )}
          </Row>
        </ListGroup.Item>
      );
    });

    return this.state.loading ? (
      <center style={{ width: "100%", height: "100%", padding: "20% 0" }}>
        <Spinner animation="border" size="md" />
      </center>
    ) : (
      <ListGroup>{cards}</ListGroup>
    );
  }

  render() {
    let submissions = this.makeSubmissions();

    return (
      <div>
        {" "}
        <center>
          <NavBar />
        </center>
        <Container style={{ marginTop: "1.2rem", minHeight: "80vh" }}>
          {this.state.innerWidth < 500 ? (
            <h3>Leaderboard:</h3>
          ) : (
            <h1>Leaderboard:</h1>
          )}
          <hr />
          <br />
          <div>{submissions}</div>
        </Container>
        <Footer
          style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
        />
      </div>
    );
  }
}

export default ProfilePage;
