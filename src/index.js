import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Navbar from "./App";

ReactDOM.render(<Navbar />, document.getElementById("game-header"));
ReactDOM.render(<App />, document.getElementById("game-body"));

