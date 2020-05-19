import { LOGIN_SUCCESS, AUTH_ERROR } from '../types';

const initalState = {
  isLoggedin: false,
  loading: true,
  user: null,
  token: localStorage.getItem('token'),
};

export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        loading: false,
        isLoggedin: true,
      };

    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isLoggedin: false,
        user: null,
        token: null,
      };

    default:
      return {
        ...state,
      };
  }
}
