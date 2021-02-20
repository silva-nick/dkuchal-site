import React from "react";

import "./Navigation.css";

function Logo(props) {
  return (
    <a
      href={props.href}
      className={"logo"}
      style={{ float: "left" }}
    ></a>
  );
}

export default Logo;
