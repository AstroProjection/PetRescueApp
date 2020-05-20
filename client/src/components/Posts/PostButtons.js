import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const PostButtons = ({ isLoggedin }) => {
  return isLoggedin ? (
    <React.Fragment>
      <h1 className='large button-holder'>
        <button className='btn btn-success'>Add Post</button>
        <button className='btn btn-success'>Remove Post</button>
        <button className='btn btn-success'>Hide Posts</button>
      </h1>
    </React.Fragment>
  ) : (
    ''
  );
};

PostButtons.propTypes = {
  isLoggedin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
});

export default connect(mapStateToProps, null)(PostButtons);
