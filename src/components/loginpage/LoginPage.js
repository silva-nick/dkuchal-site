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
    // loginUser()..

    sessionStorage.setItem(this.state.email);

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
                  <Form.Group controlId="formBasicNetid">
                    <Form.Label>Netid</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter netid"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                    />
                    <Form.Text className="text-muted">
                      Either partner's will work.
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
                    <Form.Text className="text-muted">
                      Forgot your password?{" "}
                      <a
                        href="mailto:zaiying.yang@dukekunshan.edu.cn?subject=Reset%20my%20password"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click here.
                      </a>
                    </Form.Text>
                  </Form.Group>

                  <center>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={this.submit}
                      style={{ marginTop: ".5rem" }}
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
