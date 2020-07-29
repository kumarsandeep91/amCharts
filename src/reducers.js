import { combineReducers } from "redux";
import { createReducer } from "redux-orm";
import orm from "./db";

const rootReducer = combineReducers({ orm: createReducer(orm) });

export default rootReducer;
