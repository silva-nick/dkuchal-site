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
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { putSubmission, getBoxToken, getVideoLink } from "../../api/api";
import FooterLight from "../navigation/FooterLight";
import NavBar from "../navigation/NavBar";

class SubmitPageBackup extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <center>
          <NavBar />
        </center>
        <Container>
          <br />
          <h1>Submission Backup</h1>
          <hr />
          <iframe
            class="airtable-embed"
            src="https://airtable.com/embed/shrdPXqCLp0txfftN?backgroundColor=green"
            frameborder="0"
            onmousewheel=""
            width="100%"
            height="600"
            style={{ background: "transparent", border: "1px solid #ccc" }}
          ></iframe>
        </Container>
        <FooterLight />
      </div>
    );
  }
}

export default SubmitPageBackup;
