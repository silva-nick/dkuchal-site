import "../../App.css";
import React from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import FooterLight from "../navigation/FooterLight";
import NavBar from "../navigation/NavBar";

class SubmitPage extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  state = {
    description: "",
    file: "",
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
            <h1>Submit your proof</h1>
            <br />
          </center>

          <Card className="text-left" style={{ margin: "0 0 2% 0" }}>
            <Card.Header>Proof of participation</Card.Header>
            <Card.Body>
              <Card.Text className="text-muted">Please be honest.</Card.Text>
              <Form>
                <Form.Group controlId="formBasicNames">
                  <Form.Label>Names</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control placeholder="First partner name" required />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Second partner name"
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Description"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.File
                    id="fileInput"
                    label="Picture/ video evidence, if specified."
                    onChange={(e) => this.setState({ file: e.target.files[0] })}
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" onClick={this.submit}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
              Ready to get some prizes?{" "}
              <Link to="/shop">Check them out here.</Link>
            </Card.Footer>
          </Card>
        </Container>
        <FooterLight />
      </div>
    );
  }
}

export default SubmitPage;