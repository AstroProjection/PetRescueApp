import React from 'react';
import { getPost } from '../../store/actions/post';
import { connect } from 'react-redux';
import Post from '../Posts/Post';

import Comments from './Comments';
const PostPage = ({ post: { post, loading }, match, getPost }) => {
  React.useEffect(() => {
    getPost(match.params.postId);
  }, [getPost]);
  return (
    post && (
      <React.Fragment>
        {/* <div> */}
        <section>
          <figure>
            <img src={post.image} alt='No Image' />
            <figcaption>
              Posted by - <b>{post.user.name}</b> from{' '}
              <b>{post.user.locality.locality}</b>
            </figcaption>
          </figure>
          <h1>
            <div>{post.title}</div>
          </h1>
          {/* <hr /> */}
          <h4>
            <p>{post.text}</p>
          </h4>
        </section>
        <hr />
        <section>
          <Comments />
        </section>
        {/* </div> */}
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </React.Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(PostPage);
