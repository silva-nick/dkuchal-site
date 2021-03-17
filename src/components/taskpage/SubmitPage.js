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
  ButtonGroup,
  ToggleButton,
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
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  state = {
    typeSelect: [
      { text: "One image", key: 1 },
      { text: "Two images", key: 2 },
      { text: "Video", key: 3 },
    ],
    type: 1,
    nameone: "",
    nametwo: "",
    description: "",
    file: null,
    fileUrl: null,
    filetwo: null,
    filebackupUrl: null,
    showAlert: false,
    success: true,
  };

  async submit(e) {
    e.preventDefault();
    //console.log(this.state.file);

    if (!this.state.file) {
      this.setState({ showAlert: "Please finish the form", success: false });
    }

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

    await putSubmission(
      {
        nameone: this.state.nameone,
        nametwo: this.state.nametwo,
        netidone: "", //sessionstorage
        netidtwo: "",
        description: this.state.description,
        tskcode: parseInt(this.props.location.search.substring(6)),
        file: this.state.file,
      },
      resultCallback
    );

    return;
  }

  handleAlertClose() {
    this.setState({ showAlert: false });
    return;
  }

  handleTypeChange(e) {
    let val = parseInt(e.target.value);
    if (val === 1) {
      this.setState({
        type: val,
        filetwo: null,
        filebackupURL: null,
      });
    } else {
      this.setState({ type: val });
    }
  }

  render() {
    let input;

    if (this.state.type === 1) {
      input = (
        <div>
          <Form.Group>
            <Form.File
              id="fileInput"
              label="One picture/ image, if specified."
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
                style={{ width: "40%" }}
              />
            )}
          </center>
        </div>
      );
    } else if (this.state.type === 2) {
      input = (
        <div>
          <Form.Group>
            <Form.File
              id="fileInput"
              label="Two pictures/ images, if specified."
              onChange={(e) => {
                this.setState({
                  fileURL: URL.createObjectURL(e.target.files[0]),
                  file: e.target.files[0],
                });
              }}
              required
            />
            <br />
            <Form.File
              id="fileInput2"
              onChange={(e) => {
                this.setState({
                  filebackupURL: URL.createObjectURL(e.target.files[0]),
                  filetwo: e.target.files[0],
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
                style={{ width: "25%" }}
              />
            )}{" "}
            {this.state.filetwo && (
              <Image
                src={this.state.filebackupURL}
                thumbnail
                fluid
                style={{ width: "25%" }}
              />
            )}
          </center>
        </div>
      );
    } else {
      input = (
        <div>
          <Form.Group>
            <Form.File
              id="fileInput"
              label="One video, if specified."
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
              <h4>Successfully attached.</h4>
            )}
          </center>
        </div>
      );
    }

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
                  ? "Check out the shop!"
                  : "Please try again or contact DKU Challenge admin."}
              </p>
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

                <br />
                <center>
                  {" "}
                  <ButtonGroup toggle>
                    {this.state.typeSelect.map((type, idx) => (
                      <ToggleButton
                        key={idx}
                        type="radio"
                        variant="light"
                        name="radio"
                        value={type.key}
                        checked={type.key === this.state.type}
                        onChange={(e) => this.handleTypeChange(e)}
                      >
                        {type.text}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </center>

                {input}

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
