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
      style={{ lineHeight: "2rem", minHeight: "10rem", paddingTop: "1rem" }}
    >
      <center>
        {" "}
        <a>Counseling and Psychological Services</a>
        <br />
        <a>caps@dukekunshan.edu.cn | Rooms CC 2081-2084</a>
        <br />
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
