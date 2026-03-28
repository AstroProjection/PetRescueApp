import React from 'react';
import Spinner from '../Layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../store/slices/postSlice';
import Post from './Post';
import PostButtons from './PostButtons';
import { Box, Heading, VStack, Button, HStack, Text } from '@chakra-ui/react';

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
  React.useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const [editModal, setEditModal] = React.useState(false);
  const [editPost, setEditPost] = React.useState({});
  const [pageNumber, setPageNumber] = React.useState(1);

  const profilePerPage = 5;
  const noOfPages = posts.length > 0 ? Math.ceil(posts.length / profilePerPage) : 1;

  const updatePage = (newPage) => {
    if (newPage > 0 && newPage <= noOfPages) setPageNumber(newPage);
  };

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === noOfPages;

  const startingIndex = (pageNumber - 1) * profilePerPage;
  const visiblePosts = posts.slice(startingIndex, startingIndex + profilePerPage);

  return (
    <Box maxW="container.lg" mx="auto" py={6}>
      <Heading mb={6} color="brand.600" display="flex" alignItems="center">
        <i className='fas fa-bullhorn' style={{ marginRight: '10px' }}></i> Incident Reports
      </Heading>
      
      {loading ? (
        <Spinner />
      ) : (
        <Box>
          <PostButtons
            setEditModal={setEditModal}
            editModal={editModal}
            editPost={editPost}
          />

          {posts.length === 0 ? (
            <Text color="gray.500" fontStyle="italic">No posts found.</Text>
          ) : (
            <VStack spacing={6} align="stretch" mt={6}>
              {visiblePosts.map((post) => (
                <Post
                  key={post._id}
                  user={post.user}
                  post={post}
                  comments={post.comments?.length || 0}
                  setEditModal={setEditModal}
                  editModal={editModal}
                  setEditPost={setEditPost}
                />
              ))}
            </VStack>
          )}

          {posts.length > 0 && (
            <HStack justify="center" mt={8} spacing={4}>
              <Button
                isDisabled={isFirstPage}
                onClick={() => updatePage(pageNumber - 1)}
                leftIcon={<i className='fas fa-arrow-left'></i>}
                colorScheme="brand"
                variant="outline"
              >
                Previous
              </Button>
              <Text fontWeight="bold" color="gray.600">
                Page {pageNumber} of {noOfPages}
              </Text>
              <Button
                isDisabled={isLastPage}
                onClick={() => updatePage(pageNumber + 1)}
                rightIcon={<i className='fas fa-arrow-right'></i>}
                colorScheme="brand"
                variant="outline"
              >
                Next
              </Button>
            </HStack>
          )}
        </Box>
      )}
    </Box>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
