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
  POST_LOADING,
  ADDED_COMMENT,
  REMOVED_COMMENT,
} from '../types';
import axios from 'axios';

import { setAlert } from './alert';

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post/');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    dispatch(setAlert('Please try again...', 'danger'));
  }
};

export const getPost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: POST_LOADING,
    });
    const res = await axios.get(`/api/post/${postId}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    dispatch(setAlert('Please try again...', 'danger'));
  }
};

export const uploadImage = (formData, postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    dispatch({
      type: UPLOADING,
    });

    ///uploading new pic
    const res = await axios.post(`api/post/upload/${postId}`, formData, config);
    dispatch({
      type: UPDATE_PIC,
      payload: {
        postId,
        post: res.data,
      },
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_ERROR,
      payload: error,
    });
    dispatch(setAlert('Please try again...', 'danger'));
  }
};

export const createPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    dispatch({
      type: POST_LOADING,
    });
    const res = await axios.post('/api/post', formData, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.errors,
    });
    dispatch(setAlert('Please try again...', 'danger'));
  }
};

export const editPost = (formData, postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    dispatch({
      type: POST_LOADING,
    });
    const res = await axios.put(`/api/post/${postId}`, formData, config);
    dispatch({
      type: EDITED_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.errors,
    });

    dispatch(setAlert('Connection error!Please try again...', 'danger'));
  }
};

export const removePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: POST_LOADING,
    });
    await axios.delete(`/api/post/${postId}`);

    dispatch({
      type: POST_REMOVED,
      payload: postId,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    dispatch(setAlert('Post Error!', 'danger'));
  }
};

export const addComment = (formData, postId) => async (dispatch) => {
  try {
    dispatch({
      type: POST_LOADING,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      ...formData,
    };

    const res = await axios.put(`/api/post/comments/${postId}`, body, config);

    dispatch({
      type: ADDED_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment added!', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.errors,
    });

    dispatch(setAlert('Connection error!Please try again...', 'danger'));
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: POST_LOADING,
    });

    await axios.delete(`/api/post/comments/${postId}/${commentId}`);

    dispatch({
      type: REMOVED_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment removed!', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.errors,
    });

    dispatch(setAlert('Connection Error! Please try again...', 'danger'));
  }
};
