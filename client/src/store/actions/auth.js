import axios from 'axios';
import { LOGIN_SUCCESS, AUTH_ERROR, LOGOUT, LOAD_USER } from '../types';
import setAuthToken from '../../utils/setAuthToken';

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
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
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
    // console.error(error);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
