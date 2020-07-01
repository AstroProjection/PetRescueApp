import {
  FETCHED_STREET_DATA,
  SET_CURRENT_STREET,
  FETCH_ERROR,
  // STREET_LOADING,
  UPDATED_STREET_DATA,
  STREET_LOADING,
} from '../types';
// import config from 'config';
import axios from 'axios';

const locality = 'victoria-layout';
const CancelToken = axios.CancelToken;
let cancel;

export const setCurrentStreet = (pStreet) => async (dispatch, ownProps) => {
  try {
    // cancel is defined then execute cancel
    cancel && cancel();

    dispatch({
      type: STREET_LOADING,
    });
    const res = await axios.get(`api/street/${locality}/${pStreet}`, {
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

export const updateStreetsToDB = (streetJson) => async (dispatch) => {
  try {
    // config for post req
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // array of unique street-name [ per locality ]
    // const jsonFeatures = streetJson.features;

    dispatch({
      type: STREET_LOADING,
    });
    await axios.post(`api/street/${locality}`, streetJson, config);

    dispatch({
      type: UPDATED_STREET_DATA,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  }
};

export const fetchStreetData = () => async (dispatch) => {
  console.log('fetching street data');
  try {
    dispatch({
      type: STREET_LOADING,
    });

    const res = await axios.get(`api/street/${locality}`);

    dispatch({
      type: FETCHED_STREET_DATA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_ERROR, payload: error });
  }
};
