import "../../App.css";
import React from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  Image,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { putUser } from "../../api/api";
import FooterLight from "../navigation/FooterLight";
import NavBar from "../navigation/NavBar";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  state = {
    nameone: "",
    nametwo: "",
    netidone: "",
    netidtwo: "",
    pswd: "",
    file: null,
    fileURL: null,
    showAlert: false,
    success: true,
  };

  submit(e) {
    e.preventDefault();
    console.log(this.state);

    let resultCallback = (success) => {
      if (!success) {
        this.setState({
          showAlert: "Your submission has failed.",
          success: false,
        });
      } else {
        this.setState({
          showAlert: "Your submission has succeeded. Congrats!",
          success: true,
        });
      }
    };

    if (
      !(
        this.state.nameone &&
        this.state.nametwo &&
        this.state.netidone &&
        this.state.netidtwo &&
        this.state.pswd &&
        this.state.file
      )
    ) {
      this.setState({
        showAlert: "Please complete the form",
        success: false,
      });
    } else {
      putUser(
        {
          nameone: this.state.nameone,
          nametwo: this.state.nametwo,
          netidone: this.state.netidone,
          netidtwo: this.state.netidtwo,
          pswd: this.state.pswd,
          picture: this.state.file,
          points: 40,
          claims: 0,
        },
        resultCallback
      );
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
          <center style={{ margin: "2rem 0 0 0" }}>
            <h1>Create your account</h1>
            <p>Join DKU Challenge 2.0</p>
          </center>

          <Card className="text-left" style={{ margin: "0 0 2% 0" }}>
            <Card.Header>Signup</Card.Header>
            <Card.Body>
              <Card.Text className="text-muted">
                You only need to make one account for both you and your
                teammate.
              </Card.Text>
              <Form>
                <Form.Group>
                  <Form.Label>Names</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="First partner name"
                        controlId="formBasicNameOne"
                        value={this.state.nameone}
                        onChange={(e) =>
                          this.setState({ nameone: e.target.value })
                        }
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Second partner name"
                        controlId="formBasicNameTwo"
                        value={this.state.nametwo}
                        onChange={(e) =>
                          this.setState({ nametwo: e.target.value })
                        }
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Netids</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="First partner Netid"
                        controlId="formBasicNetidOne"
                        value={this.state.netidone}
                        onChange={(e) =>
                          this.setState({ netidone: e.target.value })
                        }
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Second partner Netid"
                        controlId="formBasicNetidOne"
                        value={this.state.netidtwo}
                        onChange={(e) =>
                          this.setState({ netidtwo: e.target.value })
                        }
                        required
                      />
                    </Col>
                  </Row>
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

                <Form.Group>
                  <Form.File
                    id="fileInput"
                    label="To start, upload a profile picture of both of you!"
                    onChange={(e) =>
                      this.setState({
                        file: e.target.files[0],
                        fileURL: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  />
                </Form.Group>
                <center>
                  {this.state.file && (
                    <Image
                      src={this.state.fileURL}
                      thumbnail
                      fluid
                      style={{ width: "60%" }}
                    />
                  )}
                </center>
                <br />
                <center>
                  <Button variant="primary" type="submit" onClick={this.submit}>
                    Signup
                  </Button>
                </center>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
              Already have an account? <Link to="/login">Login here.</Link>
            </Card.Footer>
          </Card>
        </Container>
        <FooterLight />
      </div>
    );
  }
}

export default LoginPage;
