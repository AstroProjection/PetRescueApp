import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  LOAD_USER,
  AUTH_LOADING,
  USER_REGISTERED,
  ACCOUNT_VERIFIED,
  ENABLE_VERIFICATION,
  VERIFICATION_SENT,
} from '../types';

const initalState = {
  isLoggedin: false,
  loading: true,
  user: null,
  needsVerification: false,
  token: localStorage.getItem('token'),
  error: {},
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        loading: false,
        isLoggedin: true,
      };
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        isLoggedin: false,
        user: null,
        token: null,
        error: payload,
      };

    case LOAD_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        isLoggedin: true,
      };

    case USER_REGISTERED:
      // localStorage.setItem('token', payload.token);
      return {
        ...state,
        loading: false,
      };
    case ENABLE_VERIFICATION:
      return {
        ...state,
        loading: false,
        needsVerification: true,
      };
    case VERIFICATION_SENT:
      return {
        ...state,
        loading: false,
      };

    case ACCOUNT_VERIFIED:
      return {
        ...state,
        loading: true,
        needsVerification: false,
      };

    default:
      return {
        ...state,
      };
  }
}
