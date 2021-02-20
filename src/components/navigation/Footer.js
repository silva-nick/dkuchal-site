import "./Navigation.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

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
        <br /> <a>caps@dukekunshan.edu.cn</a>
        <br />
        <a>Rooms CC 2081-2084</a>
      </center>
    </Container>
  );
}

export default Footer;
