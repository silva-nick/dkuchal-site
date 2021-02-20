import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home/Home";
import TaskPage from "./taskpage/TaskPage";
import SubmitPage from "./taskpage/SubmitPage";
import ShopPage from "./shoppage/ShopPage";
import LoginPage from "./loginpage/LoginPage";
import SignupPage from "./signuppage/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/tasks" component={TaskPage} />
      <Route exact path="/tasks/submit" component={SubmitPage} />
      <Route exact path="/shop" component={ShopPage} />
      <Route exact path="/shop/claim" component={ShopPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
    </BrowserRouter>
  );
}

export default App;
