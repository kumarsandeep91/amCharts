import { Model, ORM, attr, fk } from "redux-orm";
import { v4 as uuid4 } from "uuid";

class Holding extends Model {
  static reducer(action, Holding, session) {
    const id = uuid4();
    switch (action.type) {
      case "CREATE_HOLDING":
        const asset_id = session.AssetClass.all()
          .filter((asset) => asset.name === action.payload.asset_class)
          .toModelArray()[0].id;
        Holding.create({ id: id, assetId: asset_id, ...action.payload });
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
  ticker: attr(),
  avg_price: attr(),
  market_price: attr(),
  market_value_ccy: attr(),
  latest_chg_pct: attr(),
  assetId: fk("AssetClass", "asset_class"),
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

class AssetClass extends Model {
  static reducer(action, AssetClass, session) {
    const id = uuid4();
    switch (action.type) {
      case "CREATE_ASSET_CLASS":
        AssetClass.create({ id, ...action.payload });
        break;
      default:
        return undefined;
    }
  }
}
AssetClass.modelName = "AssetClass";
AssetClass.fields = {
  id: attr(),
  name: attr(),
};
const orm = new ORM({ stateSelector: (state) => state.orm });
orm.register(Holding, AssetClass);

export default orm;
