import {
  GET_POSTS,
  UPDATE_PIC,
  UPLOADING,
  UPLOAD_ERROR,
  POST_ERROR,
  CREATE_POST,
  POST_REMOVED,
} from '../types';

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
    case CREATE_POST:
      let arr = state.posts;
      arr.unshift(payload);
      return {
        ...state,
        loading: false,
        posts: arr,
      };

    case POST_REMOVED:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
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

    case POST_ERROR:
    case UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
