/*
 * combines all th existing reducers
 */
import { combineReducers } from "redux";
import auth from "./auth";
import theme from "./theme";
import message from "./message";

const reducers = combineReducers({
  auth,
  theme,
  message,
});

export default reducers;
