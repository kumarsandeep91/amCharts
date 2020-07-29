import { Model, ORM, attr } from "redux-orm";

class Holding extends Model {
  static reducer(action, Holding, session) {
    switch (action.type) {
      case "CREATE_HOLDING":
        Holding.create(action.payload);
        break;
      default:
        return undefined;
    }
  }
}
Holding.modelName = "Holding";
Holding.fields = {
  id: attr(),
  name: attr(),
};

// {
//     name: "Property: The Sail @ Marina Bay Unit 68-020000 3BR 1991sqft",
//     ticker: "Property_TheSail@MarinaBay-68-02",
//     asset_class: "Real Estate",
//     avg_price: 3982000,
//     market_price: 3996971.1,
//     market_value_ccy: 3996971.1,
//     latest_chg_pct: 31
//     }

const orm = new ORM({ stateSelector: (state) => state.orm });
orm.register(Holding);

export default orm;
