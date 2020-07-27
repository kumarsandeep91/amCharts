import { combineReducers } from "redux";

const x = (state = [], action) => {
  return state;
};

const rootReducer = combineReducers({ x });

export default rootReducer;
