import "../../App.css";
import React from "react";
import ReactDOM from "react-dom";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { putLogin } from "../../api/api";
import FooterLight from "../navigation/FooterLight";
import NavBar from "../navigation/NavBar";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  state = {
    netid: "",
    pswd: "",
    showAlert: false,
    success: true,
  };

  submit(e) {
    e.preventDefault();
    //console.log(this.state);

    let resultCallback = (success) => {
      if (!success) {
        this.setState({
          showAlert: "Your login has failed.",
          success: false,
        });
      } else {
        console.log(success);


        sessionStorage.setItem("nameone", success.nameone);
        sessionStorage.setItem("nametwo", success.nametwo);
        sessionStorage.setItem("netidone", success.netidone);
        sessionStorage.setItem("netidtwo", success.netidtwo);
        sessionStorage.setItem("netidone", success.netidone);
        sessionStorage.setItem("claims", success.claims);

        this.setState({
          showAlert: "Your login has succeeded. Congrats!",
          success: true,
        });
      }
    };

    if (!(this.state.netid && this.state.pswd)) {
      this.setState({
        showAlert:
          "Please complete the login information, you may have to refresh the page.",
        success: false,
      });
    } else {
      try {
        putLogin(
          {
            netid: this.state.netid,
            pswd: this.state.pswd,
          },
          resultCallback
        );
      } catch (error) {
        console.log(error);
        this.setState({
          showAlert: "Your login has failed.",
          success: false,
        });
      }
    }

    return;
  }

  handleAlertClose() {
    this.setState({ showAlert: false });
    return;
  }

  render() {
    return (
      <div>
        <center>
          <NavBar />
        </center>

        {this.state.showAlert && (
          <Alert
            variant={this.state.success ? "success" : "danger"}
            onClose={() => this.handleAlertClose(false)}
            dismissible
            style={{
              textAlign: "center",
              margin: "0 0 1rem 0",
            }}
          >
            <Alert.Heading>{this.state.showAlert}</Alert.Heading>
            <hr />
            <p style={{ margin: 0 }}>
              {this.state.success
                ? "You have been automatically logged in."
                : "Please try again or contact DKU Challenge admin."}
            </p>
          </Alert>
        )}

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
                      onChange={(e) => this.setState({ netid: e.target.value })}
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
