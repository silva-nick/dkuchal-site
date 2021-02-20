import "./ShopPage.css";
import React, { useState } from "react";
import { Container, Spinner, Card, Toast, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

import { getItems } from "../../api/api";

function ClaimToast(props) {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <Toast show={show} onClose={toggleShow}>
      <Toast.Header>
        <strong className="mr-auto">Congrats!</strong>
        <small>{"props.claims+ remaining claims."}</small>
      </Toast.Header>
      <Toast.Body>
        DKU Challenge 2.0 Admin will respond to your request.
      </Toast.Body>
    </Toast>
  );
}

class ShopPage extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    loading: true,
    items: [],
    item: null,
    toasts: [],
  };

  componentDidMount = async () => {
    let items = await getItems();
    console.log(items);
    items = items ? items : [];
    this.setState({ loading: false, items: items });
  };

  handleClick(e) {
    this.setState({
      toasts: this.state.toasts.concat([
        <ClaimToast props={this.state.item} />,
      ]),
    });
    // Handle request to our email or smthn
  }

  makeItems() {
    let cards = this.state.items.map((item, index) => (
      <Card style={{ width: "24rem", margin: ".8rem 2rem" }} key={index}>
        <Card.Img variant="top" src={item.img} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {"Tier " + item.tier}
          </Card.Subtitle>
          <Card.Text>{item.text}</Card.Text>
          <Button
            onClick={(e) => {
              this.setState({ item: item });
              this.handleClick(e);
            }}
          >
            Claim
          </Button>
        </Card.Body>
      </Card>
    ));

    let rows = [];
    for (let i = 0; i < Math.ceil(cards.length / 3) * 3; i += 3) {
      rows[i] = cards.slice(i, i + 3);
    }

    let cardRows = rows.map((row, index) => (
      <div
        style={{
          padding: ".2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {row}
      </div>
    ));

    return this.state.loading ? (
      <center style={{ width: "100%", height: "100%", padding: "40% 0" }}>
        <Spinner animation="border" size="md" />
      </center>
    ) : (
      cardRows
    );
  }

  render() {
    let cards = this.makeItems();

    return (
      <div aria-live="polite" aria-atomic="true">
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "2%",
          }}
        >
          {" "}
          {this.state.toasts}
        </div>

        <center>
          <NavBar />
        </center>
        <Container style={{ marginTop: "5%" }}>
          <h1>Prize Options:</h1>
          <hr />
          <div>{cards}</div>
        </Container>

        <Footer />
      </div>
    );
  }
}

export default ShopPage;
