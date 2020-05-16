import React from 'react';
import PropTypes from 'prop-types';

const PostButtons = (props) => {
  return (
    <section className='container'>
      <p className='lead'>
        <i className='fa fa-user' /> Welcome <b>akshay</b>
      </p>
      <h1 className='large button-holder'>
        <button className='btn btn-success'>Add Post</button>
        <button className='btn btn-success'>Remove Post</button>
        <button className='btn btn-success'>Hide Posts</button>
      </h1>
    </section>
  );
};

PostButtons.propTypes = {};

export default PostButtons;
