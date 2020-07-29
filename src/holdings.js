import React, { useEffect } from "react";
import App from "./App";
import { holdingSelector } from "./selectors";
import { connect, useDispatch } from "react-redux";
import { useStyletron } from "styletron-react";

const Holding = ({ tableData }) => {
  const url = "https://canopy-frontend-task.now.sh/api/holdings";

  const dispatch = useDispatch();
  useEffect(() => {
    let id = 1;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        json.payload.map((item) => {
          dispatch({ type: "CREATE_HOLDING", payload: { ...item, id: id } });
          id = id + 1;
          return 1;
        });
        return json;
      })
      .catch((err) => console.log("API Error..."));
  }, []);
  const [css] = useStyletron();
  return (
    <App>
      <div className={css({ overflowX: "auto" })}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticker</th>
              <th>Asset Class</th>
              <th>Average Price</th>
              <th>Market Price</th>
              <th>Latest %change</th>
              <th>Market Value(Base CCY)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.asset_class}</td>
                <td>{data.avg_price}</td>
                <td>{data.market_price}</td>
                <td>{data.latest_chg_pct}</td>
                <td>{data.market_value_ccy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </App>
  );
};

const mapStateToProps = (state) => {
  return { tableData: holdingSelector(state) };
};

export default connect(mapStateToProps)(Holding);
