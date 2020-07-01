import { combineReducers } from 'redux';
import post from './reducers/post';
import auth from './reducers/auth';
import animals from './reducers/animals';
import street from './reducers/street';
import alerts from './reducers/alert';
import locality from './reducers/locality';

export default combineReducers({
  post,
  auth,
  animals,
  street,
  alerts,
  locality,
});
