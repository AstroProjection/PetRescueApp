import axios from 'axios';
export default function (token) {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    /// deleting the x-auth-token header
    delete axios.defaults.headers.common['x-auth-token'];
  }
}
