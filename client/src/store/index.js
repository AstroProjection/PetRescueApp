import { combineReducers } from 'redux';
import post from './reducers/post';
import auth from './reducers/auth';

export default combineReducers({ post, auth });
