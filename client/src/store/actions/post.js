import {
  GET_POSTS,
  UPDATE_PIC,
  UPLOADING,
  UPLOAD_ERROR,
  POST_ERROR,
  CREATE_POST,
  POST_REMOVED,
  POST_LOADING,
} from '../types';
import axios from 'axios';

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post/');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
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
    console.error(error);
    dispatch({
      type: UPLOAD_ERROR,
      payload: error,
    });
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
    const res = await axios.post('api/post', formData, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.errors,
    });
  }
};

export const removePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: POST_LOADING,
    });
    await axios.delete(`api/post/${postId}`);

    dispatch({
      type: POST_REMOVED,
      payload: postId,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.errors,
    });
  }
};
