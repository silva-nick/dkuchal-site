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
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import FooterLight from "../navigation/FooterLight";
import NavBar from "../navigation/NavBar";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  state = {
    name1: "",
    name2: "",
    email: "",
    pswd: "",
    file: null,
    fileURL: null,
  };

  submit(e) {
    e.preventDefault();
    console.log(this.state);

    return;
  }

  render() {
    return (
      <div>
        <center>
          <NavBar />
        </center>

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
                <Form.Group controlId="formBasicNames">
                  <Form.Label>Names</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="First partner name"
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
                        value={this.state.nametwo}
                        onChange={(e) =>
                          this.setState({ nametwo: e.target.value })
                        }
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formBasicNetids">
                  <Form.Label>Netids</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        placeholder="First partner Netid"
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
