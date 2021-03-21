import React from "react";

import "./Leaderboard.css";

export function UpArrow(props) {
  return <a href={props.href} className="up-arrow" />;
}

export function DownArrow(props) {
  return <a href={props.href} className="down-arrow" />;
}

export function Circle(props) {
  return <a href={props.href} className="circle" />;
}

export default { UpArrow, DownArrow, Circle };
