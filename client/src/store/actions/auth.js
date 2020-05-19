import axios from 'axios';
import { LOGIN_SUCCESS, AUTH_ERROR } from '../types';
import { body } from 'express-validator';

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
