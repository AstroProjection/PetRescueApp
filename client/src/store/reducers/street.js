import {
  FETCHED_STREET_DATA,
  SET_CURRENT_STREET,
  FETCH_ERROR,
  UPDATED_STREET_DATA,
  STREET_LOADING,
  UPDATE_STREETDB,
  STREET_UPDATED,
} from '../types';

const initialState = {
  streets: [],
  loading: false,
  street: null,
  error: [],
  updatedDB: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCHED_STREET_DATA:
      return {
        ...state,
        streets: payload,
        loading: false,
      };
    case SET_CURRENT_STREET:
      return {
        ...state,
        street: payload,
        loading: false,
      };

    case STREET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case STREET_UPDATED:
      return {
        ...state,
        loading: false,
      };

    case UPDATED_STREET_DATA:
      return {
        ...state,
        loading: false,
        updatedDB: true,
      };

    case UPDATE_STREETDB:
      return {
        ...state,
        updatedDB: false,
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
}
