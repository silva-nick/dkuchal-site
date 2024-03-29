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

  if (props.item) {
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
    shopIsOpen: false,
    showAlert: false,
    claimSuccess: false,
  };

  componentDidMount = async () => {
    let items = await getItems();
    //console.log(items);
    items = items ? items : [];
    let itemsOpen = items.map((item, index) => false);
    this.setState({ loading: false, items: items, itemsOpen: itemsOpen });
  };

  componentDidUpdate = () => {
    if (this.state.innerWidth != window.innerWidth) {
      this.setState({ innerWidth: window.innerWidth });
    }
  };

  async handleClick(e, item) {
    // Send claim to server.
    const claimSuccess = false; /*await putClaim({
      nameone: "Zaiying Yang",
      nametwo: "Nick Silva",
      usrcode: 1,
      itmcode: item.itmcode,
    });*/

    let newToast = claimSuccess.success ? (
      <ClaimToast item={item} key={this.state.toasts.length} />
    ) : (
      <ClaimToast item={null} key={this.state.toasts.length} />
    );

    this.setState({
      claimSuccess: claimSuccess.success,
      toasts: this.state.toasts.concat([newToast]),
    });

    // Update person's claims
    /*updateUser({
      nameone: "Zaiying Yang",
      nametwo: "Nick Silva",
      usrcode: 1,
      claims: 2,
    });*/
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
      <Card style={{ width: "24rem", margin: "1rem 1rem" }} key={index}>
        <Card.Img
          variant="top"
          src={
            item.img
              ? item.img[0].thumbnails
                ? item.img[0].thumbnails.large.url
                : item.img[0]
              : null
          }
          style={{ padding: "0rem", paddingBottom: 0 }}
        />
        <Card.Body>
          <Card.Title style={{ paddingTop: "0" }}>{item.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {"Tier " + item.tier}
          </Card.Subtitle>
          <Card.Text>{item.text}</Card.Text>
          {/*<center>
            <Button
              onClick={(e) => {
                this.handleClick(e, item);
              }}
              disabled={!this.state.shopIsOpen}
            >
              Claim
            </Button>
            </center>*/}
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
        key={index}
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

    if (this.state.innerWidth <= 576) {
      collapseText = {
        isOpen: "–",
        isClosed: "+",
      };

      collapseStyle = {
        fontWeight: "bold",
        fontSize: "1rem",
        float: "right",
        position: "relative",
        top: "0",
        right: "0",
        margin: 0,
      };
    } else {
      collapseText = {
        isOpen: "Collapse",
        isClosed: "Expand",
      };

      collapseStyle = {
        fontSize: "1rem",
        float: "right",
        position: "relative",
        top: "0",
        right: "0",
        margin: 0,
      };
    }

    let cards = this.state.items.map((itemGroup, index) => {
      const groupCards = this.makeItems(itemGroup);
      return (
        <div key={index}>
          <div style={{ marginTop: "3rem" }}>
            {" "}
            <h3 style={{ display: "inline" }}>
              {"Tier " + (index + 1) + " Items"}
            </h3>
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
            <div>{groupCards}</div>
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
        <Container style={{ marginTop: "1.2rem", minHeight: "80vh" }}>
          {this.state.innerWidth < 500 ? <h2>Prizes:</h2> : <h1>Prizes:</h1>}
          <hr />
          <iframe
            class="airtable-embed"
            src="https://airtable.com/embed/shr5jrbjR7i1S1NM1?backgroundColor=orangeLight"
            frameborder="0"
            onmousewheel=""
            width="100%"
            height="600"
            style={{ background: "transparent", border: "1px solid #499953" }}
          ></iframe>

          <hr />
          <div>{cards}</div>
        </Container>

        <Footer />
      </div>
    );
  }
}

export default ShopPage;
