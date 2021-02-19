import "../App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home/Home";
import TaskPage from "./home/TaskPage";
import ShopPage from "./home/ShopPage";
import LoginPage from "./home/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/tasks" component={TaskPage} />
      <Route exact path="/shop" component={ShopPage} />
      <Route exact path="/login" component={LoginPage} />
    </BrowserRouter>
  );
}

export default App;
