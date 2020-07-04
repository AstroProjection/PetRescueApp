import {
  GET_LOCALITY_INFO,
  LOCALITY_ERROR,
  LOCALITY_LOADING,
  FETCHED_LOCALITY,
} from '../types';

const initialState = {
  locality: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOCALITY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_LOCALITY_INFO:
      return {
        ...state,
        localityInfo: payload,
      };
    case LOCALITY_ERROR:
      return {
        ...state,
        error: payload,
      };
    case FETCHED_LOCALITY:
      return {
        ...state,
        locality: payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
