import { GET_POSTS, UPDATE_PIC, UPLOADING, UPLOAD_ERROR } from '../types';
import axios from 'axios';

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post/');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
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
    });
  }
};
