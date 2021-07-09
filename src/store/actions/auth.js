import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS,
  GET_ALL_USERS_FAILURE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_CLEAN_STATE,
} from "../actions";

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: { user },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserFailed = (user) => ({
  type: LOGIN_USER_FAILED,
  payload: user,
});

export const letLogoutUser = () => ({
  type: LOGOUT_USER,
});

export const letLogoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});
export const getAllUsersSuccess = (data) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: data,
});
export const getAllUsersFailure = () => ({
  type: GET_ALL_USERS_FAILURE,
});

export const letSendTheMessage = (data) => ({
  type: SEND_MESSAGE,
  payload: data,
});
export const letSendTheMessageSuccess = (data) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: data,
});
export const letSendTheMessageFailure = () => ({
  type: SEND_MESSAGE_FAILURE,
});
export const letSendTheMessageCleanState = () => ({
  type: SEND_MESSAGE_CLEAN_STATE,
});
