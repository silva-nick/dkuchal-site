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
    let result = 0;

    console.log(this.state.tasks);

    let cards = this.state.tasks.map((task, index) => (
      <Card style={{ width: "18rem" }} key={index}>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {task.subtitle}
          </Card.Subtitle>
          <Card.Text>{task.text}</Card.Text>
          <Card.Link href="#">Sign up</Card.Link>
          <Card.Link href="#">Submit</Card.Link>
        </Card.Body>
      </Card>
    ));

    return this.state.loading ? (
      <div>
        <Spinner animation="border" size="md" />
      </div>
    ) : (
      cards
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
        <Container
          style={{
            marginTop: "5%",
          }}
        >
          <h1>Open Tasks:</h1>
          <hr />
          <br />
          <div>{cards}</div>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default TaskPage;
