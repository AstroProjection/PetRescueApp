import React from 'react';
import { Link } from 'react-router-dom';

import './theme-1.css';

const Navbarv2 = () => {
  return (
    <header className='header text-center'>
      <h1 className='blog-name pt-lg-4 mb-0'>
        <Link to='/home'>
          <i className='fas fa-paw'></i> Pet RescYou
        </Link>
      </h1>

      <nav className='navbar navbar-expand-lg navbar-dark'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navigation'
          aria-controls='navigation'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div id='navigation' className='collapse navbar-collapse flex-column'>
          <div className='profile-section pt-3 pt-lg-0'>
            {/* <img
              className='profile-image mb-3 rounded-circle mx-auto'
              src='assets/images/profile.png'
              alt='image'
            /> */}

            {/* <div className='bio mb-3'> */}
            {/* Hi, my name is Anthony Doe. Briefly introduce yourself here. You
              can also provide a link to the about page. */}
            {/* <br /> */}
            {/* <a href='about.html'>Find out more about me</a> */}
            {/* </div> */}
            {/* <ul className='social-list list-inline py-3 mx-auto'>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-twitter fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-linkedin-in fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-github-alt fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-stack-overflow fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-codepen fa-fw'></i>
                </a>
              </li>
            </ul> */}
            <hr />
          </div>

          <ul className='navbar-nav flex-column text-left'>
            <li className='nav-item'>
              <a className='nav-link' href='index.html'>
                <i className='fas fa-home fa-fw mr-2'></i>Home{' '}
                {/* <span className='sr-only'>(current)</span> */}
              </a>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/animal-tracker'>
                <i className='fas fa-bookmark fa-fw mr-2'></i>Animal Tracker
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/about'>
                <i className='fas fa-user fa-fw mr-2'></i>About
              </Link>
            </li>
          </ul>

          <div className='my-2 my-md-3'>
            <a
              className='btn btn-primary'
              href='https://themes.3rdwavemedia.com/'
            >
              Contact Info
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbarv2;
