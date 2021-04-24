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
  InputGroup,
} from "react-bootstrap";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";
import ProfileCard from "./ProfileCard";
import Logo from "../navigation/Logo";

import { getSubmissions, getUser } from "../../api/api";

class ProfilePage extends React.Component {
  constructor() {
    super();
  }

  state = {
    loading: true,
    submissions: [],
    user: {},
    innerWidth: window.innerWidth,
  };

  componentDidMount = async () => {
    let submissions = await getSubmissions(sessionStorage.getItem("netidone"));
    submissions = submissions ? submissions : [];
    let user = await getUser(sessionStorage.getItem("netidone"));

    this.setState({ loading: false, submissions: submissions, user: user[0] });
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
      return (
        <ListGroup.Item
          key={index}
          style={{
            marginBottom: "1rem",
            borderTop: "1px solid #499953",
          }}
        >
          <Row>
            <Col lg={0} xs={0} style={{ paddingRight: 0 }}>
              <div style={{ ...displayCenter, padding: 0 }}>
                {"#" + submission.tskcode}
              </div>
            </Col>
            <Col lg={0} xs={0} style={{ ...displayCenter, padding: 0 }}>
              <div>
                {submission.file ? (
                  submission.file[0].thumbnails ? (
                    <Image
                      src={
                        submission.file
                          ? submission.file[0].thumbnails
                            ? submission.file[0].thumbnails.large.url
                            : null
                          : null
                      }
                      thumbnail
                      style={{
                        width: "3.2rem",
                        height: "3.2rem",
                        float: "left",
                        margin: 0,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    Logo
                  )
                ) : (
                  Logo
                )}
              </div>
            </Col>
            <Col lg={8} xs={6}>
              <div
                style={{
                  ...displayCenter,
                  lineHeight: ".4rem",
                  fontSize: "small",
                }}
              >
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "16px",
                    marginBottom: "-2px",
                  }}
                >
                  <a style={{ fontWeight: "bold" }}>Description: </a>
                  {submission.description
                    ? submission.description
                    : "You didn't write anything :'("}
                </p>
              </div>
            </Col>
            {this.state.innerWidth > 500 && (
              <Col lg={0} xs={0}>
                <div
                  style={{
                    ...displayCenter,
                    float: "right",
                    marginRight: "4px",
                  }}
                >
                  {submission.completed ? "✅" : "❌"}
                </div>
              </Col>
            )}
          </Row>
        </ListGroup.Item>
      );
    });

    return this.state.loading ? (
      <center style={{ width: "100%", height: "100%" }}>
        <Spinner animation="border" size="md" />
      </center>
    ) : (
      <ListGroup>{cards}</ListGroup>
    );
  }

  makeProfileCard() {
    return this.state.loading ? (
      <center style={{ width: "100%", height: "100%" }}>
        <Spinner animation="border" size="md" />
      </center>
    ) : (
      <ProfileCard
        user={{
          ...this.state.user,
          submissions: this.state.submissions.length,
        }}
      />
    );
  }

  render() {
    let submissions = this.makeSubmissions();
    let profileCard = this.makeProfileCard();

    let title = this.state.loading
      ? "Just a sec..."
      : this.state.user.nameone +
        " and " +
        this.state.user.nametwo +
        "'s Profile Page";

    return (
      <div>
        {" "}
        <center>
          <NavBar />
        </center>
        <Container style={{ marginTop: "1.2rem", minHeight: "80vh" }}>
          {this.state.innerWidth < 500 ? <h3>{title}</h3> : <h1>{title}</h1>}
          <hr />
          <br />
          <Row>
            <Col xs={4}>
              <div>{profileCard}</div>
            </Col>
            <Col xs={8}>
              <div>{submissions}</div>
            </Col>
          </Row>
        </Container>
        <Footer
          style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
        />
      </div>
    );
  }
}

export default ProfilePage;
