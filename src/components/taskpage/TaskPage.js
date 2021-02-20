import "../../App.css";
import React from "react";
import { Container, Spinner, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

import { getTasks } from "../../api/api";

class TaskPage extends React.Component {
  state = {
    loading: true,
    tasks: [],
  };

  componentDidMount = async () => {
    let tasks = await getTasks();
    console.log(tasks);
    tasks = tasks ? tasks : [];
    this.setState({ loading: false, tasks: tasks });
  };

  makeTasks() {
    console.log(this.state.tasks);

    let cards = this.state.tasks.map((task, index) => (
      <Card style={{ width: "18rem", margin: ".4rem" }} key={index}>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {task.points + " points"}
          </Card.Subtitle>
          <Card.Text>{task.text}</Card.Text>
          <Card.Link href="#">Sign up</Card.Link>
          <Card.Link href="#">Submit</Card.Link>
        </Card.Body>
      </Card>
    ));

    let rows = [];
    for (let i = 0; i < Math.ceil(cards.length / 4) * 4; i += 4) {
      rows[i] = cards.slice(i, i + 4);
    }

    let cardRows = rows.map((row, index) => (
      <div
        style={{
          padding: ".2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {row}
      </div>
    ));

    return this.state.loading ? (
      <div>
        <Spinner animation="border" size="md" />
      </div>
    ) : (
      cardRows
    );
  }

  render() {
    let cards = this.makeTasks();

    return (
      <div>
        {" "}
        <center>
          <NavBar />
        </center>
        <Container style={{ marginTop: "5%" }}>
          <h1>Open Tasks:</h1>
          <hr />
          <div>{cards}</div>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default TaskPage;
