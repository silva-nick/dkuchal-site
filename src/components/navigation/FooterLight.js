import "./Navigation.css";
import React from "react";
import { Container, Image } from "react-bootstrap";

import CapsLogo from "./caps-logo.svg";

function FooterLight() {
  return (
    <Container
      fluid
      className="footer-light"
      style={{ lineHeight: "1.4rem", minHeight: "4rem" }}
    >
      <center>
        {" "}
        <a>Counseling and Psychological Services</a>
        <br /> <a>Problems? Contact us: dkumwchallenge@outlook.com</a>
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

export default FooterLight;
