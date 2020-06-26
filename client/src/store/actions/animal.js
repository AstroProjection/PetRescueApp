import axios from 'axios';
import {
  ANIMAL_DELETED,
  ADD_ANIMAL,
  ANIMALS_LOADING,
  GET_STREET_ANIMALS,
  FETCH_ERROR,
  STREET_LOADING,
  STREET_UPDATED,
  ANIMALS_ERROR,
  // ANIMAL_DATA_RECEIVED
} from '../types';
import { setAlert } from './alert';

// export const getAllAnimals = () => async (dispatch) => {};

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

    const res_2 = await axios.post(
      `api/street/${res.data.locality}/${res.data.location}`,
      res.data,
      config
    );

    dispatch({
      type: STREET_UPDATED,
    });

    dispatch(setAlert('Animal Added', 'success'));

    // dispatch(getStreetAnimals(res_2.data._id));
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch({
      type: ANIMALS_ERROR,
      payload: errors,
    });
  }
};

export const getStreetAnimals = (streetId) => async (dispatch) => {
  try {
    dispatch({
      type: ANIMALS_LOADING,
    });
    console.log('in here ', streetId);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      _id: streetId,
    };

    const res = await axios.put(`api/animals`, body, config);
    console.log('after resposne');
    dispatch({
      type: GET_STREET_ANIMALS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  }
};

export const deleteAnimal = (animalId, streetId) => async (dispatch) => {
  try {
    dispatch({
      type: ANIMALS_LOADING,
    });

    await axios.delete(`api/animals/${animalId}`);

    dispatch({
      type: ANIMAL_DELETED,
    });

    dispatch(setAlert('Animal Removed', 'danger'));

    // dispatch(getStreetAnimals(streetId));
  } catch (error) {
    console.dir(error);
    dispatch({
      type: ANIMALS_ERROR,
      payload: error.response.data.errors,
    });
  }
};
