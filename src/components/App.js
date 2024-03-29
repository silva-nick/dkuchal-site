import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home/Home";
import TaskPage from "./taskpage/TaskPage";
import SubmitPage from "./taskpage/SubmitPage";
import SubmitPageBackup from "./taskpage/SubmitPageBackup";
import ShopPage from "./shoppage/ShopPage";
import About from "./about/About";
import LoginPage from "./loginpage/LoginPage";
import SignupPage from "./signuppage/SignupPage";
import Leaderboard from "./leaderboard/Leaderboard";
import ProfilePage from "./profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/tasks" component={TaskPage} />
      <Route exact path="/tasks/submit" component={SubmitPage} />
      <Route exact path="/tasks/submitbackup" component={SubmitPageBackup} />
      <Route exact path="/shop" component={ShopPage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/leaderboard" component={Leaderboard} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      {sessionStorage.getItem("netidone") && (
        <Route exact path="/profile" component={ProfilePage} />
      )}
    </BrowserRouter>
  );
}

export default App;
