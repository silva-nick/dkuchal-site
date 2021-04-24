import React from "react";
import { Container, Row, Button, Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

class ProfileCard extends React.Component {
  state = {};

  render() {
    const imageSrc = this.props.user.picture
      ? this.props.user.picture[0].thumbnails.large.url
      : require("../navigation/logo.svg");

    let title = this.props.user.nameone + " and " + this.props.user.nametwo;

    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <div
              style={{
                width: "48px",
                height: "48px",
                marginRight: "1rem",
                position: "absolute",
                left: "1rem",
                top: "1rem",
                justifyContent: "center",
                flexDirection: "column",
                display: "flex",
              }}
            >
              {" "}
              <Image
                src={imageSrc}
                style={{
                  maxWidth: "48px",
                  maxHeight: "48px",
                  backgroundColor: "#fff",
                }}
                roundedCircle
              />
            </div>

            <Card.Title
              style={{
                padding: 0,
                marginLeft: "48px",
                backgroundColor: "#fff",
                paddingLeft: "1rem",
                minHeight: "48px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h4 style={{ verticalAlign: "middle" }}>{title}</h4>
            </Card.Title>
            <hr />

            <Card.Text
              style={{
                padding: "1rem 0 1rem 0",
              }}
            >
              <p>
                <a style={{ fontWeight: "bold" }}>Points: </a>
                {this.props.user.points}
              </p>
              <p>
                <a style={{ fontWeight: "bold" }}>Submissions: </a>
                {this.props.user.submissions}
              </p>
            </Card.Text>
            <div
              style={{ position: "absolute", right: "1rem", bottom: "1rem" }}
            >
              <Button
                as={Link}
                to={"/tasks"}
                variant="link"
                style={{ color: "#5289ff" }}
              >
                {"Keep Fighting"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ProfileCard;
