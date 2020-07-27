import React from "react";
import { Link } from "react-router-dom";
import { useStyletron } from "styletron-react";
import { Button, Typography } from "antd";

import App from "./App";

const { Paragraph, Title } = Typography;

export const Home = () => {
  return (
    <App>
      <h1>Home</h1>
    </App>
  );
};

export const Networth = () => {
  return (
    <App>
      <h1>Networth</h1>
    </App>
  );
};

export const Holdings = () => {
  return (
    <App>
      <h1>Holdings</h1>
    </App>
  );
};

export const QuickNav = () => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "grid",
        gridGap: "16px",
        padding: "24px",
        gridTemplateColumns: "auto auto auto",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "rgba(142, 142, 147, 0.7)",
      })}
    >
      <Link to="/">
        <Button type="primary" block size="large">
          Home
        </Button>
      </Link>
      <Link to="/networth">
        <Button type="dashed" block size="large">
          Networth
        </Button>
      </Link>
      <Link to="/holdings">
        <Button type="danger" block size="large">
          Holdings
        </Button>
      </Link>
    </div>
  );
};

export const Footer = () => {
  const [css] = useStyletron();
  return (
    <Paragraph className={css({ textAlign: "center" })}>
      Copyright &copy; 2020, Sandeep Kumar
    </Paragraph>
  );
};

export const Header = () => {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <Title className={css({ textAlign: "center", color: "#fff !important" })}>
        Juvoxa
      </Title>
      <QuickNav />
    </React.Fragment>
  );
};
