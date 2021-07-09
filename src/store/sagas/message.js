import { all, fork, put, takeEvery, call, select } from "redux-saga/effects";
import {
  getAllMessagesFailure,
  getAllMessagesSuccess,
  GET_ALL_MESSAGES,
  LET_DELETE_THE_MESSAGE,
  letDeleteTheMessageFailure,
  letDeleteTheMessageSuccess,
} from "../actions";
import { get, deleteMethod } from "../../helpers/HTTPRequest";
import { ApiConstants } from "../api/ApiConstants";
import { NotificationManager } from "react-notifications";

function* getAllMessages({ payload }) {
  const { user_id } = payload;
  try {
    const url = `${ApiConstants.BASE_URL}${ApiConstants.MESSAGE_RESOURCE}?user_id=${user_id}`;
    const receivedData = yield call(get, url);

    const urlNew = `${ApiConstants.BASE_URL}${ApiConstants.MESSAGE_RESOURCE}?message_type=sent&user_id=${user_id}`;
    const sentData = yield call(get, urlNew);

    yield put(
      getAllMessagesSuccess({
        receivedArr: receivedData.data,
        sentArr: sentData.data,
      })
    );
  } catch (error) {
    NotificationManager.error(error.message);
    yield put(getAllMessagesFailure());
  }
}

function* letDeleteTheMessage({ payload }) {
  const { message_id } = payload;
  try {
    const url = `${ApiConstants.BASE_URL}${ApiConstants.MESSAGE_RESOURCE}/${message_id}`;
    yield call(deleteMethod, url);

    const oldReceivedData = yield select((state) => state.message.receivedArr);
    const oldSentData = yield select((state) => state.message.sentArr);

    yield put(
      letDeleteTheMessageSuccess({
        receivedArr: oldReceivedData.filter((item) => item.id !== message_id),
        sentArr: oldSentData.filter((item) => item.id !== message_id),
      })
    );
    NotificationManager.success("Message has been deleted successfully");
  } catch (error) {
    NotificationManager.error(error.message);
    yield put(letDeleteTheMessageFailure());
  }
}

export function* watchLoginUser() {
  yield takeEvery(GET_ALL_MESSAGES, getAllMessages);
  yield takeEvery(LET_DELETE_THE_MESSAGE, letDeleteTheMessage);
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser)]);
}
