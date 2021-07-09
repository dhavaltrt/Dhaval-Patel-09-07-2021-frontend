import { all } from "redux-saga/effects";
import authSagas from "./auth";
import messageSagas from "./message";

export default function* rootSaga(getState) {
  yield all([authSagas(), messageSagas()]);
}
