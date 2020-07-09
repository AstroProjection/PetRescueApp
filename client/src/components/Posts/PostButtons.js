import React from 'react';
import AddPost from './AddPost';
import EditPost from './EditPost';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PostButtons = ({ isLoggedin, editModal, editPost, setEditModal }) => {
  const [postModal, setPostModal] = React.useState(false);

  return isLoggedin ? (
    <React.Fragment>
      <h1 className='large button-holder'>
        <button className='btn  add-post' onClick={(e) => setPostModal(true)}>
          <i className='fa fa-plus-circle'></i> Add Post
        </button>
      </h1>

      <AddPost show={postModal} onHide={() => setPostModal(false)} />
      <EditPost
        show={editModal}
        onHide={() => setEditModal(false)}
        post={editPost}
      />
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

export default connect(mapStateToProps, null)(React.memo(PostButtons));
