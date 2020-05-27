import {
  GET_ALL_DATA,
  GET_ALL_ANIMALS,
  GET_DOGS,
  GET_CATS,
  GET_FEEDERS,
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
    case GET_ALL_ANIMALS:
      return {
        ...state,
        dogs: payload.filter((animal) => animal.type === 'Dog'),
        cats: payload.filter((animal) => animal.type === 'Cat'),
        loading: false,
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

    default:
      return {
        ...state,
      };
  }
}
