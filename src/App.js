import React from "react";
import { render } from "react-dom";
import Stonks from "./components/Stonks";

const App = () => {
  return (
    <div id="content">
      <h1 className="header">Stonks</h1>
      <Stonks />
    </div>
  );
};

render(<App />, document.getElementById("root"));
