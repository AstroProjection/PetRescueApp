import { GET_POSTS } from '../types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  errors: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    default:
      return state;
  }
}
