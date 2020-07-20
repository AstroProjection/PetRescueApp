import { ANIMALS_LOADING, ANIMALS_ERROR, GET_ANIMAL_PROFILE } from '../types';

const initialState = {
  feeders: [],
  animal: null,
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

    case GET_ANIMAL_PROFILE:
      return {
        ...state,
        animal: payload,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
}
