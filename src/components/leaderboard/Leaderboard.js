//import "../../App.css";
import React from "react";
import {
  Container,
  Spinner,
  Card,
  Button,
  Collapse,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

import { getLeaders } from "../../api/api";

class Leaderboard extends React.Component {
  constructor() {
    super();
  }

  state = {
    loading: true,
    leaders: [],
    innerWidth: window.innerWidth,
  };

  componentDidMount = async () => {
    let leaders = await getLeaders();
    leaders = leaders ? leaders : [];

    this.setState({ loading: false, leaders: leaders });
  };

  componentDidUpdate = () => {
    if (this.state.innerWidth != window.innerWidth) {
      this.setState({ innerWidth: window.innerWidth });
    }
  };

  makeLeaders() {
    let cards = this.state.leaders.map((leader, index) => (
      <ListGroup.Item key={index}>
        {index + " place is " + leader.nameone}
      </ListGroup.Item>
    ));

    return this.state.loading ? (
      <center style={{ width: "100%", height: "100%", padding: "60% 0" }}>
        <Spinner animation="border" size="md" />
      </center>
    ) : (
      <ListGroup>{cards}</ListGroup>
    );
  }

  render() {
    let leaderboard = this.makeLeaders();

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
