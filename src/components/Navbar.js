import React from "react";

const Navbar = props => (
  <header className="navbar">
    <ul className="navbar-nav bd-navbar-nav flex-row">
      <li className="nav-item">
        <a href="https://www.ebay.com/b/Milton-Bradley-Memory-Board-Traditional-Games/2550/bn_1914568">
          <img src="../public/Memory1980.jpg"></img>
        </a>
      </li>
      <li className="nav-item">
        <h2>1980...err....2018 Memory Game!!</h2>
      </li>
      <li className="nav-item">
        <div className="card-body">
          <p className="card-text">Number Correct: {this.state.correct}</p>
          <p className="card-text">High Score: {this.state.highScore}</p>
        </div>
      </li>
    </ul>
  </header>
);

export default Navbar;
