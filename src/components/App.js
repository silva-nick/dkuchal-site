import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home/Home";
import TaskPage from "./taskpage/TaskPage";
import ShopPage from "./shoppage/ShopPage";
import LoginPage from "./loginpage/LoginPage";

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
