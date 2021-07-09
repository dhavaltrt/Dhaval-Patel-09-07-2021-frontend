import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
  getAllUsersSuccess,
  GET_ALL_USERS,
  letSendTheMessageFailure,
  letSendTheMessageSuccess,
  LOGIN_USER,
  LOGOUT_USER,
  loginUserSuccess,
  letLogoutUserSuccess,
  loginUserFailed,
  SEND_MESSAGE,
  letSendTheMessageCleanState,
} from "../actions";
import { get, post } from "../../helpers/HTTPRequest";
import {
  getUserData,
  getUserToken,
  setUserData,
  setUserToken,
  unsetUserData,
  unsetUserToken,
} from "src/helpers/StorageUtils";
import { ApiConstants } from "../api/ApiConstants";
import { NotificationManager } from "react-notifications";

function* loginWithUsernamePassword({ payload }) {
  try {
    const url = `${ApiConstants.BASE_URL}${ApiConstants.LOGIN_PATH}`;
    const userData = yield call(post, url, payload.user);

    // check if already stored, than removed
    if (getUserData()) {
      unsetUserData();
    }

    if (getUserToken()) {
      unsetUserToken();
    }

    // set token and data
    setUserData(userData.data.user);
    setUserToken("Bearer " + userData.data.token);

    yield put(loginUserSuccess({ data: userData.data.user }));
  } catch (error) {
    NotificationManager.error(error.message);
    yield put(loginUserFailed());
  }
}

function* letLogoutUser() {
  try {
    const url = `${ApiConstants.BASE_URL}${ApiConstants.LOGOUT_PATH}`;
    yield call(get, url);

    // clear all storage data
    localStorage.clear();
    yield put(letLogoutUserSuccess());
  } catch (error) {
    NotificationManager.error(error.message);
  }
}

function* getAllUsers() {
  try {
    const url = `${ApiConstants.BASE_URL}${ApiConstants.ALL_USERS}`;
    const userData = yield call(get, url);

    yield put(getAllUsersSuccess(userData.data));
  } catch (error) {
    NotificationManager.error(error.message);
  }
}

function* letSendTheMessage({ payload }) {
  try {
    const url = `${ApiConstants.BASE_URL}${ApiConstants.MESSAGE_RESOURCE}`;
    yield call(post, url, payload);
    yield put(letSendTheMessageSuccess());
    NotificationManager.success("Message has been sent successfully");
  } catch (error) {
    NotificationManager.error(error.message);
    yield put(letSendTheMessageFailure());
  } finally {
    yield put(letSendTheMessageCleanState());
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithUsernamePassword);
  yield takeEvery(LOGOUT_USER, letLogoutUser);
  yield takeEvery(GET_ALL_USERS, getAllUsers);
  yield takeEvery(SEND_MESSAGE, letSendTheMessage);
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser)]);
}
