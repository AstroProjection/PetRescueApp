import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = (props) => {
  return (
    <Navbar bg='light' expand='lg'>
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
          <LinkContainer to='/link'>
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/link'>
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to='/login'>
            <Nav.Link>Logout</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
  // (
  //   <nav className='navbar bg-success'>
  //     <h1>
  //       <Link to='/'>
  //         <i className='fas fa-paw bg-yellow' /> Pet Rescue
  //       </Link>
  //     </h1>
  //     <ul>
  //       <li>
  //         <Link to='/register'>
  //           <strong>Register</strong>
  //         </Link>
  //       </li>
  //       <li>
  //         <Link to='/login'>
  //           <strong>Login</strong>
  //         </Link>
  //       </li>
  //     </ul>
  //   </nav>
  // );
};

Navbar.propTypes = {};

export default NavbarComponent;
