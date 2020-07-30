import React, { useEffect } from "react";
import App from "./App";
import { holdingSelector } from "./selectors";
import { connect, useDispatch } from "react-redux";
import { useStyletron } from "styletron-react";

const Holding = ({ tableData }) => {
  const url = "https://canopy-frontend-task.now.sh/api/holdings";

  const dispatch = useDispatch();
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // json.payload.map((item) => {
        //   dispatch({ type: "CREATE_HOLDING", payload: item });
        //   return 1;
        // });
        const holdingData = json.payload;
        const asset_class_array = holdingData.map((item) => item.asset_class);
        const asset_class_set = new Set(asset_class_array);
        asset_class_set.forEach((item) =>
          dispatch({ type: "CREATE_ASSET_CLASS", payload: { name: item } })
        );

        holdingData.map((item) => {
          dispatch({ type: "CREATE_HOLDING", payload: item });
        });
        return json;
      })
      .catch((err) => console.log(`API Error...${err}`));
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
                <td>{data.name}</td>
                <td>{data.ticker}</td>
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
