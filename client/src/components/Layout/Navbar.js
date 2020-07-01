import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

const NavbarComponent = ({ logout, isLoggedin }) => {
  const guestLinks = (
    <React.Fragment>
      <LinkContainer to='/register'>
        <Nav.Link>Register</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/login'>
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
    </React.Fragment>
  );

  const authLinks = (
    <React.Fragment>
      <Nav.Link onClick={logout}>
        <i className='fa fa-sign-out' /> Logout
      </Nav.Link>
    </React.Fragment>
  );

  return (
    <Navbar bg='light' expand='lg' fixed='top' collapseOnSelect>
      <LinkContainer to='/home'>
        <Navbar.Brand>
          <i className='fas fa-paw'></i>Pet RescYou
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
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
        <Nav>{isLoggedin ? authLinks : guestLinks}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  isLoggedin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
});

export default connect(mapStateToProps, { logout })(NavbarComponent);
