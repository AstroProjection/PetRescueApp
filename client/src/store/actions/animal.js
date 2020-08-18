import axios from 'axios';
import {
  ANIMAL_DELETED,
  ANIMAL_ADDED,
  ANIMALS_LOADING,
  ANIMALS_ERROR,
  GET_ANIMAL_PROFILE,
  // ANIMAL_DATA_RECEIVED
} from '../types';
import { setAlert } from './alert';

// export const getAllAnimals = () => async (dispatch) => {};

///add an animal to animal tracker
export const addAnimal = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ANIMALS_LOADING,
    });
    const res = await axios.post('/api/animals', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('adding completed');
    dispatch({
      type: ANIMAL_ADDED,
      payload: res.data,
    });

    dispatch(setAlert('Animal Added', 'success'));
  } catch (error) {
    dispatch({
      type: ANIMALS_ERROR,
      payload: error,
    });

    dispatch(
      setAlert('There was an error adding an animal! Try again', 'danger')
    );
  }
};

export const deleteAnimal = (animalId, streetId) => async (dispatch) => {
  try {
    dispatch({
      type: ANIMALS_LOADING,
    });

    const res = await axios.delete(`/api/animals/${animalId}`);

    dispatch({
      type: ANIMAL_DELETED,
      payload: { animalId, type: res.data },
    });

    dispatch(setAlert('Animal Removed', 'danger'));
  } catch (error) {
    // console.log('error');
    // console.log(error);
    dispatch({
      type: ANIMALS_ERROR,
      payload: error,
    });

    dispatch(setAlert('There was an error removing the animal!', 'danger'));
  }
};

export const getAnimalProfile = (animalId) => async (dispatch) => {
  try {
    dispatch({
      type: ANIMALS_LOADING,
    });
    const res = await axios.get(`/api/animals/${animalId}`);

    dispatch({
      type: GET_ANIMAL_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ANIMALS_ERROR,
      payload: error,
    });
  }
};
