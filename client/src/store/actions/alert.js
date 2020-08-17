import { SET_ALERT, REMOVE_ALERT } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (
  message,
  alertType,
  timeout = 2250,
  dismissible = false
) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {
      message,
      alertType,
      id,
      dismissible,
    },
  });

  if (!dismissible)
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};
