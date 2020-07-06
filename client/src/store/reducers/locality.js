import { LOCALITY_ERROR, LOCALITY_LOADING, FETCHED_LOCALITY } from '../types';

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
    case LOCALITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
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
