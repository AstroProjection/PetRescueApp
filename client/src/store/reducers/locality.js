import { GET_LOCALITY_INFO, LOCALITY_ERROR } from '../types';

const initialState = {
  localityInfo: {},
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return {
        ...state,
      };
  }
}
