import "../../App.css";
import React from "react";
import { Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

function LoginPage() {
  return (
    <div>
      <center>
        <NavBar />
      </center>
      <Footer />
    </div>
  );
}

export default LoginPage;
