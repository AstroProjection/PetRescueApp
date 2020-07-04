import axios from 'axios';
import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  LOAD_USER,
  AUTH_LOADING,
  USER_REGISTERED,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

import { setAlert } from './alert';

export const login = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    const res = await axios.post('/api/auth', body, config);
    // console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    // console.dir(error);
    dispatch({
      type: AUTH_ERROR,
    });

    dispatch(setAlert(error.response.data.error, 'danger'));
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  setAuthToken();
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('api/auth');
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    // console.dir(error);
    const err = error.response
      ? error.response.data.errors
      : 'Connection error';
    dispatch({
      type: AUTH_ERROR,
      errors: err,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      ...formData,
    };

    dispatch({
      type: AUTH_LOADING,
    });

    const res = await axios.post('api/user/', body, config);

    dispatch(setAlert('User Registered! logging in...', 'success'));

    dispatch({
      type: USER_REGISTERED,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const err = error.response
      ? error.response.data.errors
      : 'Connection error';

    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};
