import React, { useEffect, Fragment } from 'react';
import Spinner from '../Layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../store/actions/post';

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <section className='inner-container'>
      <h1 className=''>Attention! Look at these posts</h1>
      <div>
        {loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            {posts.map((post, index) => (
              <div className='' key={index}>
                Title:{post.title}
                <br />
                text:{post.text}
                <br />
                posted by:{post.user.name}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Posts);
