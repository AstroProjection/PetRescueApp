import React from 'react';
import AddPost from './AddPost';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PostButtons = ({ isLoggedin }) => {
  const [postModal, setPostModal] = React.useState(false);
  return isLoggedin ? (
    <React.Fragment>
      <h1 className='large button-holder'>
        <button
          className='btn btn-success add-post'
          onClick={(e) => setPostModal(true)}
        >
          <i className='fa fa-plus-circle'></i> Add Post
        </button>
        {/* <button className='btn btn-success'>Remove Post</button> */}
        {/* <button className='btn btn-success'>Hide Posts</button> */}
      </h1>

      <AddPost show={postModal} onHide={() => setPostModal(false)} />
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
