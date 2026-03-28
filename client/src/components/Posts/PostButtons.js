import React from 'react';
import AddPost from './AddPost';
import EditPost from './EditPost';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Box } from '@chakra-ui/react';

const PostButtons = ({ isLoggedin, editModal, editPost, setEditModal }) => {
  const [postModal, setPostModal] = React.useState(false);

  return isLoggedin ? (
    <Box mb={4}>
      <Button 
        colorScheme="brand" 
        size="md" 
        onClick={() => setPostModal(true)}
        leftIcon={<i className='fa fa-plus-circle'></i>}
        boxShadow="md"
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
      >
        Create New Post
      </Button>

      <AddPost isOpen={postModal} onClose={() => setPostModal(false)} />
      {/* Fallback to legacy edit post temporarily while migrating edit component */}
      <EditPost
        isOpen={editModal}
        show={editModal} 
        onHide={() => setEditModal(false)}
        onClose={() => setEditModal(false)}
        post={editPost}
      />
    </Box>
  ) : null;
};

PostButtons.propTypes = {
  isLoggedin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
});

export default connect(mapStateToProps, null)(React.memo(PostButtons));
