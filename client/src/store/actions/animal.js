import axios from 'axios';
import {
  POST_ERROR,
  ADD_ANIMAL,
  ANIMALS_LOADING,
  GET_STREET_ANIMALS,
  FETCH_ERROR,
  STREET_LOADING,
  STREET_UPDATED,
  // ANIMAL_DATA_RECEIVED
} from '../types';
import { setAlert } from './alert';

export const getAllAnimals = () => async (dispatch) => {};

///add an animal to animal tracker
export const addAnimal = (formData) => async (dispatch) => {
  try {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    dispatch({
      type: ANIMALS_LOADING,
    });

    const res = await axios.post('api/animals', formData, config);

    dispatch({
      type: ADD_ANIMAL,
      payload: res.data,
    });

    // update street with animal information

    config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    dispatch({
      type: STREET_LOADING,
    });

    await axios.post(
      `api/street/${res.data.locality}/${res.data.location}`,
      res.data,
      config
    );

    dispatch({
      type: STREET_UPDATED,
    });

    dispatch(setAlert('Animal Added', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.errors,
    });
  }
};

export const getStreetAnimals = (street) => async (dispatch) => {
  console.log('getstreetanimals action creator');
  try {
    dispatch({
      type: ANIMALS_LOADING,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`api/animals`, street, config);

    dispatch({
      type: GET_STREET_ANIMALS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      FETCH_ERROR,
      payload: error,
    });
  }
};
