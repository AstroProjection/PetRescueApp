import {
  // GET_ALL_STREET_DATA,
  SET_CURRENT_STREET,
  FETCH_ERROR,
  LOADING,
  UPDATED_STREET_DATA,
} from '../types';
// import config from 'config';
import axios from 'axios';

const locality = 'victoria-layout';

export const setCurrentStreet = (pStreet) => async (dispatch, ownProps) => {
  try {
    dispatch({
      type: LOADING,
    });
    const res = await axios.get(`api/street/${locality}/${pStreet}`);
    dispatch({
      type: SET_CURRENT_STREET,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
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
    const jsonFeatures = streetJson.features;
    // let arrayOfFeatureStreetNames = jsonFeatures.map(
    //   (feature) => feature.properties.name
    // );
    // array of streets from the 'locality'
    dispatch({
      type: LOADING,
    });
    const res = await axios.post(`api/street/${locality}`, streetJson, config);
    console.log(res.data);

    dispatch({
      type: UPDATED_STREET_DATA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  }
};

export const fetchStreetData = () => async (dispatch) => {};
