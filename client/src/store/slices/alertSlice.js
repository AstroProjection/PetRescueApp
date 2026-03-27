import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const alertSlice = createSlice({
  name: 'alert',
  initialState: [],
  reducers: {
    addAlert: (state, action) => {
      state.push(action.payload);
    },
    removeAlert: (state, action) => {
      return state.filter((alert) => alert.id !== action.payload);
    },
  },
});

const { addAlert, removeAlert } = alertSlice.actions;

export const setAlert =
  (message, alertType, timeout = 2250, dismissible = false) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch(addAlert({ message, alertType, id, dismissible }));
    if (!dismissible)
      setTimeout(() => dispatch(removeAlert(id)), timeout);
  };

export { removeAlert };
export default alertSlice.reducer;
