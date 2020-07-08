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

  const [pageNumber, setPageNumber] = React.useState(1);

  const profilePerPage = 2;
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
                index={index}
                postId={post._id}
                img={post.image}
                title={post.title}
                text={post.text}
                user={post.user}
                comments={post.comments.length}
                urgency={post.urgency}
                tag={post.tag}
                status={post.status}
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
            <PostButtons />

            <Accordion>{postList()}</Accordion>
            <div>
              <nav class='blog-nav nav nav-justified my-4'>
                {!isFirstPage && (
                  <div
                    class='posts-buttons nav-item posts-left'
                    onClick={(e) => updatePage(pageNumber - 1)}
                  >
                    <i class='arrow-prev fas fa-long-arrow-alt-left'></i>
                    Previous
                  </div>
                )}
                {!isLastPage && (
                  <div
                    class='posts-buttons nav-link-next nav-item posts-right'
                    onClick={(e) => updatePage(pageNumber + 1)}
                  >
                    Next
                    <i class='arrow-next fas fa-long-arrow-alt-right'></i>
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
