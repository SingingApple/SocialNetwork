import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Navbar></Navbar>
        <Route path="/" exact component={Landing}></Route>
        <section className="container">
          <Alert></Alert>
          <Switch>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
          </Switch>
        </section>
      </React.Fragment>
    </Router>
  );
};

export default App;
