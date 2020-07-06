import { ANIMALS_LOADING, ANIMALS_ERROR } from '../types';

const initialState = {
  feeders: [],
  dogs: [],
  cats: [],
  loading: true,
  errors: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case ANIMALS_LOADING:
      return {
        ...state,
        loading: true,
        errors: [],
      };

    case ANIMALS_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    default:
      return {
        ...state,
      };
  }
}
