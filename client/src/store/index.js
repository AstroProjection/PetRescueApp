import { combineReducers } from 'redux';
import post from './reducers/post';
import auth from './reducers/auth';
import animals from './reducers/animals';

export default combineReducers({ post, auth, animals });
