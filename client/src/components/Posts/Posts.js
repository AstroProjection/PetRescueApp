import React, { useEffect, Fragment } from 'react';
import Spinner from '../Layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../store/actions/post';
import Post from './Post';
import Accordion from 'react-bootstrap/Accordion';

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <section className='inner-container'>
      <h1 className=''>Attention! Look at these posts</h1>
      <div>
        {loading ? (
          <Fragment>
            <Spinner />
          </Fragment>
        ) : (
          <Fragment>
            <Accordion>
              {posts.map((post, index) => (
                <Post
                  key={post._id}
                  index={index}
                  postId={post._id}
                  img={post.image}
                  title={post.title}
                  text={post.text}
                  user={post.user}
                />
              ))}
            </Accordion>
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
});

export default connect(mapStateToProps, { getAllPosts })(Posts);