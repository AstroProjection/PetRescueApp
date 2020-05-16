import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  return (
    <nav className='navbar bg-success'>
      <h1>
        <Link to='/'>
          <i className='fas fa-paw bg-yellow' /> Pet Rescue
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/register'>
            <strong>Register</strong>
          </Link>
        </li>
        <li>
          <Link to='/login'>
            <strong>Login</strong>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
