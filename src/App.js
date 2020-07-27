import React from "react";
import { useStyletron } from "styletron-react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [css] = useStyletron();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className={css({ color: "red", backgroundColor: "#666" })}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
