import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from "../actions";
import { getUserData } from "src/helpers/StorageUtils";

const userData = getUserData();

const INIT_STATE = {
  user: userData !== null ? userData : null,
  loading: false,
  type: "",
  isLoggedIn: userData !== null ? true : false,
  appUsers: [],
  sendMessage: {
    isLoader: false,
    success: false,
  },
};

const auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case GET_ALL_USERS:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        type: action.type,
        isLoggedIn: true,
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        type: action.type,
        isLoggedIn: false,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        type: action.type,
        isLoggedIn: false,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        type: action.type,
        appUsers: action.payload,
      };
    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        type: action.type,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        type: action.type,
        sendMessage: {
          ...state.sendMessage,
          isLoader: true,
          success: false,
        },
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        type: action.type,
        sendMessage: {
          ...state.sendMessage,
          isLoader: false,
          success: true,
        },
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        type: action.type,
        sendMessage: {
          ...state.sendMessage,
          isLoader: false,
          success: false,
        },
      };
    default:
      return { ...state };
  }
};

export default auth;
