import { createSelector } from "redux-orm";
import orm from "./db";

export const holdingSelector = createSelector(orm, (session) => {
  return session.Holding.all().toModelArray();
});
