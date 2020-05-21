import { GET_POSTS, UPDATE_PIC, UPLOADING, UPLOAD_ERROR } from '../types';

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
    case UPDATE_PIC:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? payload.post : post
        ),
        loading: false,
      };

    case UPLOADING:
      return {
        ...state,
        loading: true,
      };

    case UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
