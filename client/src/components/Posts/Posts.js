import React, { useEffect } from 'react';
import Spinner from '../Layout/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../store/actions/post';
import Post from './Post';

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
              <Post
                key={post._id}
                img={post.img}
                title={post.title}
                text={post.text}
                user={post.user}
              />
            ))}
          </>
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
