import "./ShopPage.css";
import React from "react";
import { Container, Spinner, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

import { getItems } from "../../api/api";

class ShopPage extends React.Component {
  state = {
    loading: true,
    items: [],
  };

  componentDidMount = async () => {
    let items = await getItems();
    console.log(items);
    items = items ? items : [];
    this.setState({ loading: false, items: items });
  };

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
          <Card.Link href="#">Claim</Card.Link>
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
      <div>
        <Spinner animation="border" size="md" />
      </div>
    ) : (
      cardRows
    );
  }

  render() {
    let cards = this.makeItems();

    return (
      <div>
        {" "}
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
