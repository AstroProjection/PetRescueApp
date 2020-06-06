import {
  GET_ALL_STREET_DATA,
  SET_CURRENT_STREET,
  FETCH_ERROR,
  UPDATED_STREET_DATA,
} from '../types';

const initialState = {
  streets: [],
  loading: true,
  street: null,
  error: [],
  updatedDB: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_STREET_DATA:
      return {
        ...state,
        streets: payload,
      };
    case SET_CURRENT_STREET:
      return {
        ...state,
        street: payload,
        loading: false,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: payload,
      };

    case UPDATED_STREET_DATA:
      return {
        ...state,
        streets: payload,
        loading: false,
        updatedDB: true,
      };

    default:
      return {
        ...state,
      };
  }
}
