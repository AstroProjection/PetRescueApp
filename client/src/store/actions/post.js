import { GET_POSTS } from '../types';
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
