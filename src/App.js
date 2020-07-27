import React from "react";
import { useStyletron } from "styletron-react";

import "./App.css";
import "antd/dist/antd.css";
import { Footer, Header } from "./components";

const App = (props) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: "grid",
        gridGap: "24px",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        backgroundColor: "rgb(94, 92, 230)",
      })}
    >
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default App;
