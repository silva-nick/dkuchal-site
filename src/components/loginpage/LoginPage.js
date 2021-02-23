import "../../App.css";
import React from "react";
import ReactDOM from "react-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import FooterLight from "../navigation/FooterLight";
import NavBar from "../navigation/NavBar";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  state = {
    email: "",
    pswd: "",
  };

  submit(e) {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.pswd);
    return;
  }

  render() {
    return (
      <div>
        <center>
          <NavBar />
        </center>
        <Container>
          <center>
            <Card
              className="text-left"
              style={{ margin: "4rem 0 0 0", width: "28rem" }}
            >
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={this.state.pswd}
                      onChange={(e) => this.setState({ pswd: e.target.value })}
                      required
                    />
                  </Form.Group>
                  <center>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={this.submit}
                    >
                      Login
                    </Button>
                  </center>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">
                Don't have an account? <Link to="/signup">Sign up here.</Link>
              </Card.Footer>
            </Card>
          </center>
        </Container>
        <FooterLight />
      </div>
    );
  }
}

export default LoginPage;
