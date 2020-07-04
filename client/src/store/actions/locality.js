import {
  GET_LOCALITY_INFO,
  LOCALITY_ERROR,
  LOCALITY_LOADING,
  FETCHED_LOCALITY,
} from '../types';
import axios from 'axios';

export const getLocalityInfo = (localityName) => async (dispatch) => {
  try {
    const res = await axios.get(`api/locality/${localityName}`);
    dispatch({
      type: GET_LOCALITY_INFO,
      payload: res.data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: LOCALITY_ERROR,
      error: error.response.data,
    });
  }
};

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
    dispatch({ type: LOCALITY_ERROR, error: error.reponse.data });
  }
};

export const setCurrentLocality = (locality) => {
  // const response = axios.get('')
};
