import { createSelector } from "redux-orm";
import orm from "./db";

export const holdingSelector = createSelector(orm, (session) => {
  return session.AssetClass.all()
    .toModelArray()
    .map((asset_class) => {
      const { ref } = asset_class;
      return {
        ...ref,
        holdings: asset_class.holdings.toRefArray().map((holding) => holding),
      };
    });
});
