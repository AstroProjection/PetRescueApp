import axios from 'axios';
import {
  // GET_ALL_DATA,
  GET_ALL_ANIMALS,
  // GET_DOGS,
  // GET_CATS,
  // GET_FEEDERS,
  POST_ERROR,
  ADD_ANIMAL,
  // SET_ALERT,
  SET_CURRENT_STREET,
} from '../types';
import { setAlert } from './alert';

export const getAllAnimals = () => async (dispatch) => {
  const res = await axios.get('api/animals/');

  dispatch({
    type: GET_ALL_ANIMALS,
    payload: res.data,
  });
};

///add an animal to animal tracker
export const addAnimal = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post('api/animals', formData, config);
    dispatch({
      type: ADD_ANIMAL,
      payload: res.data,
    });

    dispatch(setAlert('Animal Added', 'success'));

    dispatch({
      type: SET_CURRENT_STREET,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.errors,
    });
  }
};
