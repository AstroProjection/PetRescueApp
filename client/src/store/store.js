import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice';
import deviceReducer from './slices/deviceSlice';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import animalsReducer from './slices/animalsSlice';
import streetReducer from './slices/streetSlice';
import localityReducer from './slices/localitySlice';

const store = configureStore({
  reducer: {
    alert: alertReducer,
    device: deviceReducer,
    auth: authReducer,
    post: postReducer,
    animals: animalsReducer,
    street: streetReducer,
    locality: localityReducer,
  },
});

export default store;
