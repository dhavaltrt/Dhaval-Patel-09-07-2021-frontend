import {
  GET_ALL_MESSAGES,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_FAILURE,
  LET_DELETE_THE_MESSAGE,
  LET_DELETE_THE_MESSAGE_SUCCESS,
  LET_DELETE_THE_MESSAGE_FAILURE,
} from "../actions";
import { getUserData } from "src/helpers/StorageUtils";

const userData = getUserData();

const INIT_STATE = {
  currentUserSelectedId: userData !== null ? userData.id : 0,
  loading: false,
  type: "",
  receivedArr: [],
  sentArr: [],
};

const auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_MESSAGES:
    case LET_DELETE_THE_MESSAGE:
      return {
        ...state,
        type: action.type,
        loading: true,
      };
    case GET_ALL_MESSAGES_SUCCESS:
    case LET_DELETE_THE_MESSAGE_SUCCESS:
      return {
        ...state,
        type: action.type,
        loading: false,
        receivedArr: action.payload.receivedArr,
        sentArr: action.payload.sentArr,
      };
    case GET_ALL_MESSAGES_FAILURE:
    case LET_DELETE_THE_MESSAGE_FAILURE:
      return {
        ...state,
        type: action.type,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default auth;
