import {
  GET_POSTS,
  GET_POST,
  UPDATE_PIC,
  UPLOADING,
  UPLOAD_ERROR,
  POST_ERROR,
  CREATE_POST,
  EDITED_POST,
  POST_REMOVED,
  FETCH_ERROR,
  POST_LOADING,
  ADDED_COMMENT,
  REMOVED_COMMENT,
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
    case GET_POST:
      return {
        ...state,
        post: payload,
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
    case EDITED_POST:
      // let arr = state.posts;
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) => {
          return post._id === payload.id ? payload.post : post;
        }),
      };

    case ADDED_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload },
      };

    case REMOVED_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id.toString() !== payload
          ),
        },
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

    case POST_LOADING:
    case UPLOADING:
      return {
        ...state,
        loading: true,
      };

    case POST_ERROR:
    case UPLOAD_ERROR:
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
