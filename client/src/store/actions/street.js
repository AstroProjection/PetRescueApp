import {
  FETCHED_STREET_DATA,
  SET_CURRENT_STREET,
  FETCH_ERROR,
  STREET_LOADING,
} from '../types';
// import config from 'config';
import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel;

export const setCurrentStreet = (pStreetName, pLocalityName) => async (
  dispatch,
  ownProps
) => {
  try {
    // cancel is defined then execute cancel
    cancel && cancel();

    dispatch({
      type: STREET_LOADING,
    });
    const res = await axios.get(`api/street/${pLocalityName}/${pStreetName}`, {
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    });
    dispatch({
      type: SET_CURRENT_STREET,
      payload: res.data,
    });
  } catch (error) {
    if (axios.isCancel(error)) {
      // console.log('get req was cancelled');
      cancel('GET request was cancelled');
    } else {
      dispatch({
        type: FETCH_ERROR,
        payload: error,
      });
    }
  }
};

export const fetchStreetData = (localityId) => async (dispatch) => {
  try {
    dispatch({
      type: STREET_LOADING,
    });
    const res = await axios.get(`api/street/${localityId}`);

    dispatch({
      type: FETCHED_STREET_DATA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_ERROR, payload: error });
  }
};
