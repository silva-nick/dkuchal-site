import "../../App.css";
import React from "react";
import { Container, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

function ShopPage() {
  return (
    <div>
      {" "}
      <Alert
        variant="warning"
        dismissible
        style={{
          textAlign: "center",
        }}
      >
        <Alert.Heading>
          Our website is currently under development!
        </Alert.Heading>
      </Alert>
    </div>
  );
}

export default ShopPage;
