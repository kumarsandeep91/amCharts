import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStyletron } from "styletron-react";
import { Button, Typography, Spin } from "antd";

import AmCharts from "@amcharts/amcharts3-react";

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
  const [css] = useStyletron();
  const url = "https://canopy-frontend-task.now.sh/api/networth";
  const [chartData, setChartData] = useState([]);
  const [isApiFailed, setApi] = useState(false);

  const parseData = (data) => {
    let parsedData = data.filter(
      (obj) => moment().diff(moment(obj.traded_on), "days") <= 365
    );
    console.log(data);
    return parsedData;
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // TODO: date parsing
        console.log(json.length);

        if (json) {
          let parsedData = parseData(json);

          parsedData.sort((a, b) => {
            if (
              moment(a.traded_on, "DD-MM-YYYY").isAfter(
                moment(b.traded_on, "DD-MM-YYYY")
              )
            )
              return 0;
            else return -1;
          });
          setChartData(parsedData);
        } else {
          setApi(true);
        }
      })
      .catch((err) => setApi(true));
  }, []);
  return (
    <App>
      <div>
        {/*amCharts here */}
        {isApiFailed ? (
          <Title>API Error. Try again later</Title>
        ) : chartData.length === 0 ? (
          <Spin />
        ) : (
          <div className={css({ overflowX: "auto", width: "100%" })}>
            <AmCharts.React
              style={{
                width: "100vw",
                minHeight: "500px",
              }}
              options={{
                type: "serial",
                dataProvider: chartData,
                categoryField: "traded_on",
                graphs: [
                  {
                    valueField: "net_worth",
                    type: "line", // other values includes "line", "column", "step", "smoothedLine", "candlestick", "ohlc"
                    fillAlphas: 0.8,
                    angle: 30,
                    depth3D: 15,
                  },
                ],
                categoryAxis: {
                  autoGridCount: false,
                  gridCount: chartData.length,
                  gridPosition: "start",
                  labelRotation: 90,
                },
              }}
            />
          </div>
        )}
      </div>
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
