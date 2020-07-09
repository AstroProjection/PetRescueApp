import React, { Fragment } from 'react';
import Spinner from '../Layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../store/actions/post';
import Post from './Post';
import PostButtons from './PostButtons';
import Accordion from 'react-bootstrap/Accordion';

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
  React.useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  //
  const [editModal, setEditModal] = React.useState(false);
  const [editPost, setEditPost] = React.useState({});
  const [pageNumber, setPageNumber] = React.useState(1);

  const profilePerPage = 5;
  const noOfPages =
    posts.length > 0 ? Math.ceil(posts.length / profilePerPage) : 1;

  const updatePage = (newPage) => {
    if (newPage > 0 && newPage <= noOfPages) setPageNumber(newPage);
  };

  const isFirstPage = pageNumber === 1 ? true : false;
  const isLastPage = pageNumber === noOfPages ? true : false;

  const postList = () => {
    let profileCount = profilePerPage;
    const startingIndex = (pageNumber - 1) * profilePerPage;
    return posts && posts.length > 0
      ? posts.map((post, index) => {
          if (index >= startingIndex && profileCount-- > 0) {
            return (
              <Post
                key={post._id}
                user={post.user}
                post={post}
                comments={post.comments.length}
                setEditModal={setEditModal}
                editModal={editModal}
                setEditPost={setEditPost}
              />
            );
          } else {
            // console.log('returning nothing');
            // console.log(pageNumber);
            return '';
          }
        })
      : 'None';
  };

  return (
    <section className='inner-container'>
      <h1 className=''>Posts</h1>
      <div>
        {loading ? (
          <Fragment>
            <Spinner />
          </Fragment>
        ) : (
          <Fragment>
            <PostButtons
              setEditModal={setEditModal}
              editModal={editModal}
              editPost={editPost}
            />

            <Accordion>{postList()}</Accordion>
            <div>
              <nav className='blog-nav nav nav-justified my-4'>
                {!isFirstPage && (
                  <div
                    className='posts-buttons nav-item posts-left'
                    onClick={(e) => updatePage(pageNumber - 1)}
                  >
                    <i className='arrow-prev fas fa-long-arrow-alt-left'></i>
                    Previous
                  </div>
                )}
                {!isLastPage && (
                  <div
                    className='posts-buttons nav-link-next nav-item posts-right'
                    onClick={(e) => updatePage(pageNumber + 1)}
                  >
                    Next
                    <i className='arrow-next fas fa-long-arrow-alt-right'></i>
                  </div>
                )}
              </nav>
            </div>
          </Fragment>
        )}
      </div>
    </section>
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
