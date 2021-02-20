import "./Navigation.css";
import React from "react";
import { Container } from "react-bootstrap";

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
        <br /> <a>Problems? Contact us: zaiying.yang@dukekunshan.edu.cn</a>
      </center>
    </Container>
  );
}

export default FooterLight;
