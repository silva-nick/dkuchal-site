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
import { Link, Redirect } from "react-router-dom";

import { putSubmission } from "../../api/api";
import FooterLight from "../navigation/FooterLight";
import NavBar from "../navigation/NavBar";

class SubmitPage extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  state = {
    nameone: "",
    nametwo: "",
    description: "",
    file: null,
    fileUrl: null,
    showAlert: false,
  };

  async submit(e) {
    e.preventDefault();
    //console.log(this.state.file);

    if (!this.state.file) {
      this.setState({ showAlert: "Please finish the form" });
    }

    const success = await putSubmission({
      nameone: this.state.nameone,
      nametwo: this.state.nametwo,
      netidone: "", //sessionstorage
      netidtwo: "",
      description: this.state.description,
      tskcode: parseInt(this.props.location.search.substring(6)),
      file: this.state.file,
    });

    console.log(success);

    if (!success) {
      this.setState({ showAlert: "Your submission has failed." });
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

        <Container>
          <center style={{ margin: "2rem 0 0 0" }}>
            <h1>Submit your proof</h1>
            <br />
          </center>

          {this.state.showAlert && (
            <Alert
              variant="danger"
              onClose={() => this.handleAlertClose(false)}
              dismissible
              style={{
                textAlign: "center",
                margin: "0 0 1rem 0",
              }}
            >
              <Alert.Heading>{this.state.showAlert}</Alert.Heading>
              <hr />
              <p style={{ margin: 0 }}>Please try again or contact DKU Challenge admin.</p>
            </Alert>
          )}

          <Card className="text-left" style={{ margin: "0 0 2% 0" }}>
            <Card.Header>Proof of participation</Card.Header>
            <Card.Body>
              <Card.Text className="text-muted">Please be honest.</Card.Text>
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
                    onChange={(e) => {
                      this.setState({
                        fileURL: URL.createObjectURL(e.target.files[0]),
                        file: e.target.files[0],
                      });
                    }}
                    required
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
