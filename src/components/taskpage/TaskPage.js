import "../../App.css";
import React from "react";
import { Container, Spinner, Card, Button, Collapse } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

import { getTasks } from "../../api/api";

class TaskPage extends React.Component {
  constructor() {
    super();
  }

  state = {
    loading: true,
    tasks: [],
    tasksOpen: [],
    innerWidth: window.innerWidth,
  };

  componentDidMount = async () => {
    let tasks = await getTasks();
    //console.log(tasks);
    tasks = tasks ? tasks : [];
    let tasksOpen = tasks.map((task, index) => true);
    this.setState({ loading: false, tasks: tasks, tasksOpen: tasksOpen });
  };

  componentDidUpdate = () => {
    if (this.state.innerWidth != window.innerWidth) {
      this.setState({ innerWidth: window.innerWidth });
    }
  };

  makeTasks(tasks) {
    let cards = tasks.map((task, index) => (
      <Card style={{ width: "18rem", margin: ".4rem" }} key={index}>
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {task.points + " points"}
          </Card.Subtitle>
          <Card.Text>{task.text}</Card.Text>
          <center>
            {" "}
            <Card.Link href={task.description ? task.description[0].url : "#"}>
              Sign up
            </Card.Link>
            <Card.Link as={Link} to={"/tasks/submit?task=" + task.tskcode}>
              Submit
            </Card.Link>
          </center>
        </Card.Body>
      </Card>
    ));

    let cols = this.state.innerWidth < 500 ? 1 : 4;

    let rows = [];
    for (let i = 0; i < Math.ceil(cards.length / cols) * cols; i += cols) {
      rows[i] = cards.slice(i, i + cols);
    }

    let cardRows = rows.map((row, index) => (
      <div
        style={{
          padding: ".2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        key={index}
      >
        {row}
      </div>
    ));

    return this.state.loading ? (
      <center style={{ width: "100%", height: "100%", padding: "60% 0" }}>
        <Spinner animation="border" size="md" />
      </center>
    ) : (
      cardRows
    );
  }

  render() {
    let collapseText, collapseStyle;
    if (this.innerWidth <= 576) {
      collapseText = {
        isOpen: "-",
        isClosed: "+",
      };

      collapseStyle = {
        fontWeight: "bold",
      };
    } else {
      collapseText = {
        isOpen: "Collapse",
        isClosed: "Expand",
      };

      collapseStyle = {
        fontSize: "1rem",
        float: "right",
        position: "relative",
        top: "0",
        right: "0",
        margin: 0,
      };
    }

    let cards = this.state.tasks.map((taskGroup, index) => {
      const groupCards = this.makeTasks(taskGroup);
      return (
        <div key={index}>
          <div>
            <h3 style={{ display: "inline" }}>
              {"Tier " + (index + 1) + " Items"}
            </h3>
            <Button
              variant="light"
              onClick={() => {
                let temp = this.state.tasksOpen;
                temp[index] = !temp[index];
                this.setState({
                  tasksOpen: temp,
                });
              }}
              style={collapseStyle}
            >
              {this.state.tasksOpen[index]
                ? collapseText.isOpen
                : collapseText.isClosed}
            </Button>

            <hr />
          </div>
          <Collapse in={this.state.tasksOpen[index]}>
            <center>{groupCards}</center>
          </Collapse>
        </div>
      );
    });

    return (
      <div>
        {" "}
        <center>
          <NavBar />
        </center>
        <Container style={{ marginTop: "1.2rem" }}>
          {this.state.innerWidth < 500 ? (
            <h3>Open Tasks:</h3>
          ) : (
            <h1>Open Tasks:</h1>
          )}
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
