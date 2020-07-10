import { LOCALITY_ERROR, LOCALITY_LOADING, FETCHED_LOCALITY } from '../types';
import axios from 'axios';
import { setAlert } from './alert';

// this method will fetch locality from the DB
export const setLocality = (locality) => async (dispatch) => {
  try {
    dispatch({ type: LOCALITY_LOADING });
    const res = await axios.get(`api/locality/${locality}`);
    dispatch({
      type: FETCHED_LOCALITY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: LOCALITY_ERROR, error: 'Error fetching Locality!' });
    dispatch(setAlert('Please try again..', 'danger'));
  }
};
