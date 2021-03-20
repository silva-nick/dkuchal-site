import "./ShopPage.css";
import React, { useState } from "react";
import {
  Container,
  Spinner,
  Card,
  Toast,
  Button,
  Alert,
  Collapse,
} from "react-bootstrap";

import Footer from "../navigation/Footer";
import NavBar from "../navigation/NavBar";

import { getItems, putClaim, updateUser } from "../../api/api";

function ClaimToast(props) {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  if (props) {
    return (
      <Toast show={show} onClose={toggleShow} style={{ zIndex: 1 }}>
        <Toast.Header>
          <strong className="mr-auto">Congrats!</strong>
          <small>{"props.claims + remaining claims."}</small>
        </Toast.Header>
        <Toast.Body>
          DKU Challenge 2.0 Admin will respond to your request.
        </Toast.Body>
      </Toast>
    );
  } else {
    return (
      <Toast show={show} onClose={toggleShow} style={{ zIndex: 1 }}>
        <Toast.Header>
          <strong className="mr-auto" style={{ color: "red" }}>
            ERROR
          </strong>
          <small>{"Failure to process request"}</small>
        </Toast.Header>
        <Toast.Body>
          Please contact DKU Challenge admin for assistance.
        </Toast.Body>
      </Toast>
    );
  }
}

class ShopPage extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  state = {
    loading: true,
    items: [],
    itemsOpen: [],
    item: null,
    innerWidth: window.innerWidth,
    toasts: [],
    shopIsOpen: true,
    showAlert: true,
    claimSuccess: false,
  };

  componentDidMount = async () => {
    let items = await getItems();
    //console.log(items);
    items = items ? items : [];
    let itemsOpen = items.map((item, index) => true);
    this.setState({ loading: false, items: items, itemsOpen: itemsOpen });
  };

  componentDidUpdate = () => {
    if (this.state.innerWidth != window.innerWidth) {
      this.setState({ innerWidth: window.innerWidth });
    }
  };

  async handleClick(e, item) {
    // Send claim to server.
    const claimSuccess = await putClaim({
      nameone: "Zaiying Yang",
      nametwo: "Nick Silva",
      usrcode: 1,
      itmcode: item.itmcode,
    });

    let newToast = claimSuccess.success ? (
      <ClaimToast props={item} key={this.state.toasts.length} />
    ) : (
      <ClaimToast props={null} key={this.state.toasts.length} />
    );

    this.setState({
      claimSuccess: claimSuccess.success,
      toasts: this.state.toasts.concat([newToast]),
    });

    // Update person's claims
    updateUser({
      nameone: "Zaiying Yang",
      nametwo: "Nick Silva",
      usrcode: 1,
      claims: 2,
    });
  }

  handleAlertClose() {
    this.setState({ showAlert: false });
    return;
  }

  handleFailureAlertClose() {
    this.setState({ showFailureAlert: false });
    return;
  }

  makeItems(items) {
    let cards = items.map((item, index) => (
      <Card style={{ width: "24rem", margin: ".8rem 2rem" }} key={index}>
        <Card.Img variant="top" src={item.img[0].thumbnails.large.url} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {"Tier " + item.tier}
          </Card.Subtitle>
          <Card.Text>{item.text}</Card.Text>
          <center>
            <Button
              onClick={(e) => {
                this.handleClick(e, item);
              }}
              disabled={!this.state.shopIsOpen}
            >
              Claim
            </Button>
          </center>
        </Card.Body>
      </Card>
    ));

    let cols = this.state.innerWidth < 500 ? 1 : 3;

    let rows = [];
    for (let i = 0; i < Math.ceil(cards.length / cols) * cols; i += cols) {
      rows[i] = cards.slice(i, i + cols);
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
      <center style={{ width: "100%", height: "100%", padding: "60% 0" }}>
        <Spinner animation="border" size="md" />
      </center>
    ) : (
      cardRows
    );
  }

  render() {
    let collapseText, collapseStyle;
    if (this.innerWidth <= 576) {
      collapseText = {
        isOpen: "-",
        isClosed: "+",
      };

      collapseStyle = {
        fontWeight: "bold",
      };
    } else {
      collapseText = {
        isOpen: "Collapse",
        isClosed: "Expand",
      };
    }

    let cards = this.state.items.map((itemGroup, index) => {
      const groupCards = this.makeItems(itemGroup);
      return (
        <div key={index}>
          <div>
            <h3>{"Tier " + index + "Items"}</h3>
            <Button
              variant="light"
              onClick={() => {
                let temp = this.state.itemsOpen;
                temp[index] = !temp[index];
                this.setState({
                  itemsOpen: temp,
                });
              }}
              style={collapseStyle}
            >
              {this.state.itemsOpen[index]
                ? collapseText.isOpen
                : collapseText.isClosed}
            </Button>

            <hr />
          </div>
          <Collapse in={this.state.itemsOpen[index]}>
            <center>{groupCards}</center>
          </Collapse>
        </div>
      );
    });

    return (
      <div aria-live="polite" aria-atomic="true">
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "2%",
            zIndex: 1,
          }}
        >
          {" "}
          {this.state.toasts}
        </div>

        <center>
          <NavBar />
        </center>

        {this.state.showAlert && (
          <Alert
            variant="warning"
            onClose={() => this.handleAlertClose(false)}
            dismissible
            style={{
              textAlign: "center",
              margin: 0,
            }}
          >
            <Alert.Heading>Our program hasn't finished yet!</Alert.Heading>
            <hr />
            <p style={{ margin: 0 }}>
              Come back on 4/09/2021 to check out and claim your prizes.
            </p>
          </Alert>
        )}

        <Container style={{ marginTop: "1.2rem" }}>
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
