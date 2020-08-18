import axios from 'axios';
import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  LOAD_USER,
  AUTH_LOADING,
  USER_REGISTERED,
  ENABLE_VERIFICATION,
  ACCOUNT_VERIFIED,
  VERIFICATION_SENT,
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
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errorObj = error.response.data;
    console.dir(errorObj);
    console.log(error.response.status);

    dispatch({
      type: AUTH_ERROR,
      payload: errorObj,
    });
    if (error.response.status === 401) {
      dispatch(setAlert(errorObj, 'danger', 3500, true));
      // dispatch({
      //   type: ENABLE_VERIFICATION,
      // });
      // return;
    } else {
      dispatch(setAlert(errorObj, 'danger', 3500));
    }
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
    const res = await axios.get('/api/auth');
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

    const res = await axios.post('/api/user/', body, config);

    dispatch(
      setAlert(
        'Verification Email has been sent to your email address. [Check Spam Folder]',
        'success',
        10000
      )
    );

    dispatch({
      type: USER_REGISTERED,
    });

    // dispatch(loadUser());
  } catch (error) {
    const err = error.response
      ? error.response.data.errors
      : 'Connection error';

    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });

    dispatch(setAlert(err, 'danger'));
  }
};

export const sendVerification = () => async (dispatch) => {
  try {
    const res = await axios.post('/confirmation/r');
    dispatch({
      type: VERIFICATION_SENT,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data,
    });
  }
};
