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
              <th>Average Price</th>
              <th>Market Price</th>
              <th>Latest %change</th>
              <th>Market Value(Base CCY)</th>
            </tr>
          </thead>
          {tableData.map((data) => (
            <tbody id={data.id}>
              <tr
                className={css({ backgroundColor: "red" })}
                onClick={() =>
                  alert("This will collapse soon. feature is on the way.")
                }
              >
                <td colspan="6">{data.name}</td>
              </tr>
              {data.holdings.map((holding) => (
                <tr id={holding.id}>
                  <td>{holding.name}</td>
                  <td>{holding.ticker}</td>
                  <td>{holding.avg_price}</td>
                  <td>{holding.market_price}</td>
                  <td>{holding.latest_chg_pct}</td>
                  <td>{holding.market_value_ccy}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </App>
  );
};

const mapStateToProps = (state) => {
  return { tableData: holdingSelector(state) };
};

export default connect(mapStateToProps)(Holding);
