import {
  GET_ALL_DATA,
  GET_DOGS,
  GET_CATS,
  GET_FEEDERS,
  ADD_ANIMAL,
  ANIMALS_LOADING,
  // ANIMAL_DATA_RECEIVED,
  GET_STREET_ANIMALS,
} from '../types';

const initialState = {
  feeders: [],
  dogs: [],
  cats: [],
  loading: true,
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

    case ADD_ANIMAL:
      return {
        ...state,
        loading: false,
      };
    case ANIMALS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_STREET_ANIMALS:
      return {
        ...state,
        loading: false,
        dogs: payload.dogs,
        cats: payload.cats,
      };

    default:
      return {
        ...state,
      };
  }
}
