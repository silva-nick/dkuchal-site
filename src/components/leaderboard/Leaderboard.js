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
import ProfileCard from "../profile/ProfileCard";

import { getLeaders, getSubmissions } from "../../api/api";
import { UpArrow, DownArrow, Flag, Circle } from "./Vectors";

class Leaderboard extends React.Component {
  constructor() {
    super();
  }

  state = {
    loadingLeaders: true,
    loadingTop: true,
    leaders: [],
    topUsers: [],
    innerWidth: window.innerWidth,
  };

  componentDidMount = async () => {
    let leaders = await getLeaders();
    leaders = leaders ? leaders : [];

    this.setState({ loadingLeaders: false, leaders: leaders });

    let topUsers = [];
    for (let i = 0; i < 3; i++) {
      let submissions = await getSubmissions(leaders[i].netidone);
      topUsers.push({ ...leaders[i], submissions: submissions.length });
    }

    this.setState({ loadingTop: false, topUsers: topUsers });
  };

  componentDidUpdate = () => {
    if (this.state.innerWidth != window.innerWidth) {
      this.setState({ innerWidth: window.innerWidth });
    }
  };

  makeTop() {
    if (this.state.loadingTop) {
      return (
        <center style={{ width: "100%", height: "100%" }}>
          <Spinner animation="border" size="md" />
          <br />
          <br />
        </center>
      );
    } else {
      let bestTeam = (
        <center style={{ width: "18rem", paddingBottom: "1rem" }}>
          <ProfileCard user={this.state.topUsers[0]} />
        </center>
      );

      let secondBest = (
        <center>
          <div
            style={{ display: "flex", flexDirection: "row", width: "38rem" }}
          >
            <div
              style={{
                maxWidth: "18rem",
                display: "inline-block",
                marginRight: "1rem",
              }}
            >
              <ProfileCard user={this.state.topUsers[1]} />
            </div>

            <div
              style={{
                maxWidth: "18rem",
                display: "inline-block",
                marginLeft: "1rem",
              }}
            >
              <ProfileCard user={this.state.topUsers[2]} />
            </div>
          </div>
        </center>
      );

      return (
        <center>
          <center>{bestTeam}</center>
          <center>{secondBest}</center>
        </center>
      );
    }
  }

  makeLeaders() {
    let displayCenter = {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100%",
    };

    let cards = this.state.leaders.map((leader, index) => {
      let symbol;
      if (leader.status > 0) {
        symbol = <UpArrow />;
      } else if (leader.status === 0) {
        symbol = <Circle />;
      } else {
        symbol = <DownArrow />;
      }
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
                  src={leader.picture[0].thumbnails.large.url}
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
                <p>{leader.nameone + " and " + leader.nametwo}</p>
                <p style={{ color: "#a4a4a4", margin: 0, fontSize: "small" }}>
                  {leader.points + " Points"}
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

    return this.state.loadingLeaders ? (
      <center style={{ width: "100%", height: "100%", padding: "20% 0" }}>
        <Spinner animation="border" size="md" />
      </center>
    ) : (
      <ListGroup>{cards}</ListGroup>
    );
  }

  render() {
    let leaderboard = this.makeLeaders();
    let top = this.makeTop();

    return (
      <div>
        {" "}
        <center>
          <NavBar />
        </center>
        <Container style={{ marginTop: "1.2rem", minHeight: "80vh" }}>
          {this.state.innerWidth < 500 ? (
            <h3>Congradulate our winners:</h3>
          ) : (
            <h1>Congradulate our winners:</h1>
          )}
          <hr />
          <br />
          <div>{top}</div>
          <br />
          <br />
          {this.state.innerWidth < 500 ? (
            <h3>Leaderboard:</h3>
          ) : (
            <h1>Leaderboard:</h1>
          )}
          <hr />
          <br />
          <div>{leaderboard}</div>
        </Container>
        <Footer
          style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
        />
      </div>
    );
  }
}

export default Leaderboard;
