import {
  FETCHED_STREET_DATA,
  SET_CURRENT_STREET,
  FETCH_ERROR,
  UPDATED_STREET_DATA,
  STREET_LOADING,
  STREET_UPDATED,
  ANIMAL_DELETED,
  ANIMAL_ADDED,
} from '../types';

const initialState = {
  loading: false,
  street: null,
  streets: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  let key;
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
      };
    case ANIMAL_DELETED:
      key = `${payload.type}s`;
      return {
        ...state,
        loading: false,
        street: {
          ...state.street,
          [key]: state.street[key].filter(
            (animal) => animal._id !== payload.animalId
          ),
        },
      };

    case ANIMAL_ADDED:
      key = `${payload.type}s`;
      console.log(state.street);
      return {
        ...state,
        loading: false,
        street: {
          ...state.street,
          [key]: [...state.street[key], payload.animal],
        },
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
