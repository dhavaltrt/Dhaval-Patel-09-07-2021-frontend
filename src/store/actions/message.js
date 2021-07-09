import {
  GET_ALL_MESSAGES,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAILURE,
  GET_ALL_MESSAGES_CLEAN_STATE,
  LET_DELETE_THE_MESSAGE,
  LET_DELETE_THE_MESSAGE_SUCCESS,
  LET_DELETE_THE_MESSAGE_FAILURE,
  LET_DELETE_THE_MESSAGE_CLEAN_STATE,
} from "../actions";

export const getAllMessages = (data) => ({
  type: GET_ALL_MESSAGES,
  payload: data,
});
export const getAllMessagesSuccess = (data) => ({
  type: GET_ALL_MESSAGES_SUCCESS,
  payload: data,
});
export const getAllMessagesFailure = () => ({
  type: GET_ALL_MESSAGES_FAILURE,
});
export const getAllMessagesCleanState = () => ({
  type: GET_ALL_MESSAGES_CLEAN_STATE,
});

export const letDeleteTheMessage = (data) => ({
  type: LET_DELETE_THE_MESSAGE,
  payload: data,
});
export const letDeleteTheMessageSuccess = (data) => ({
  type: LET_DELETE_THE_MESSAGE_SUCCESS,
  payload: data,
});
export const letDeleteTheMessageFailure = () => ({
  type: LET_DELETE_THE_MESSAGE_FAILURE,
});
export const letDeleteTheMessageCleanState = () => ({
  type: LET_DELETE_THE_MESSAGE_CLEAN_STATE,
});
