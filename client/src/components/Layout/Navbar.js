import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

import { loadUser } from '../../store/actions/auth';
const NavbarComponent = ({ loadUser, logout, isLoggedin, user, isMobile }) => {
  React.useEffect(() => {
    if (localStorage.token) loadUser();

    console.log('rendering useeffect');
    return () => {
      console.log('removed resize listener');
      return window.removeEventListener('resize', updatePageSize);
    };
  }, [loadUser]);

  const [pageSize, updatePageSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  window.addEventListener('resize', updatePageSize);

  console.log('rendering...');

  const guestLinks = (
    <React.Fragment>
      <LinkContainer to='/register'>
        <Nav.Link className='auth-button'>
          <i className='fas fa-user-plus'></i> Sign-Up
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/login'>
        <Nav.Link className='auth-button'>
          <i className='fas fa-sign-in-alt'></i> Sign-In
        </Nav.Link>
      </LinkContainer>
    </React.Fragment>
  );

  const authLinks = (
    <React.Fragment>
      <Nav.Link onClick={logout} className='auth-button'>
        <i className='fas fa-sign-out-alt' /> Logout
      </Nav.Link>
    </React.Fragment>
  );

  return (
    <Navbar expand='lg' fixed='top' collapseOnSelect>
      <LinkContainer to='/home'>
        <Navbar.Brand className='petrescue-logo'>
          <i className='fas fa-paw'></i>Pet RescYou
        </Navbar.Brand>
      </LinkContainer>
      {!isMobile && window.innerWidth > 992 && (
        <React.Fragment>
          {isLoggedin ? (
            <React.Fragment>
              <hr />
              {user && <div>Welcome {user.name}!</div>}
              <hr />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <hr />
              <div>Login to post..</div>
              <hr />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav>
          <LinkContainer to='/home'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/animal-tracker'>
            <Nav.Link>Animal Tracker</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/about'>
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
        <hr />
        <Nav className='auth-links'>{isLoggedin ? authLinks : guestLinks}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  isLoggedin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
  loading: state.auth.loading,
  isMobile: state.device.isMobile,
});

export default connect(mapStateToProps, { loadUser, logout })(
  React.memo(NavbarComponent)
);
