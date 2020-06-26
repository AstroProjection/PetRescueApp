import {
  GET_ALL_DATA,
  GET_DOGS,
  GET_CATS,
  GET_FEEDERS,
  ADD_ANIMAL,
  ANIMALS_LOADING,
  ANIMALS_ERROR,
  GET_STREET_ANIMALS,
  ANIMAL_DELETED,
} from '../types';

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
    case GET_ALL_DATA:
      return {
        ...state,
        dogs: payload.dogs,
        cats: payload.cats,
        feeders: payload.feeders,
      };

    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        loading: false,
      };
    case GET_CATS: {
      return {
        ...state,
        cats: payload,
        loading: false,
      };
    }

    case GET_FEEDERS: {
      return {
        ...state,
        feeders: payload,
        loading: false,
      };
    }
    case ANIMAL_DELETED:
    case ADD_ANIMAL:
      return {
        ...state,
        loading: false,
      };
    case ANIMALS_LOADING:
      return {
        ...state,
        loading: true,
        errors: [],
      };

    case GET_STREET_ANIMALS:
      return {
        ...state,
        loading: false,
        dogs: payload.dogs,
        cats: payload.cats,
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
