import "./Navigation.css";
import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import CapsLogo from "./caps-logo.svg";

function Footer() {
  return (
    <Container
      fluid
      className="footer"
      style={{ lineHeight: "1rem", minHeight: "10rem", padding: "1.6rem" }}
    >
      <center>
        {" "}
        <p>Counseling and Psychological Services</p>
        <p>caps@dukekunshan.edu.cn | Rooms CC 2081-2084</p>
        <a href="https://dukekunshan.edu.cn/en/caps">
          <Image
            src={CapsLogo}
            style={{ height: "4rem", marginTop: ".4rem" }}
            thumbnail
          />
        </a>
      </center>
    </Container>
  );
}

export default Footer;
