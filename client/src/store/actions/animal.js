import axios from 'axios';
import {
  GET_ALL_DATA,
  GET_ALL_ANIMALS,
  GET_DOGS,
  GET_CATS,
  GET_FEEDERS,
} from '../types';

export const getAllAnimals = () => async (dispatch) => {
  const res = await axios.get('api/animals/');

  dispatch({
    type: GET_ALL_ANIMALS,
    payload: res.data,
  });
};
