import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

const App = () => {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Landing></Landing>
    </React.Fragment>
  );
};

export default App;