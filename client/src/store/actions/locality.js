import { GET_LOCALITY_INFO, LOCALITY_ERROR } from '../types';
import axios from 'axios';

export const getLocalityInfo = (localityName) => async (dispatch) => {
  try {
    const res = await axios.get(`api/locality/${localityName}`);
    console.log(localityName);
    dispatch({
      type: GET_LOCALITY_INFO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOCALITY_ERROR,
      error: error.response.data,
    });
  }
};
