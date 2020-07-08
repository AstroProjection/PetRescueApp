import React from 'react';
import { getPost } from '../../store/actions/post';
import { connect } from 'react-redux';
import Moment from 'react-moment';
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
        <section className='postpage'>
          <figure className='postpage-img'>
            <img src={post.image} alt='No Image' />
            <figcaption>{'--'}</figcaption>
          </figure>
          <div className='postpage-body'>
            <h1>
              <div>{post.title}</div>
            </h1>
            <h4>
              <p>{post.text}</p>
            </h4>
            Created by - <b>{post.user.name}</b> from{' '}
            <b>{post.user.locality.locality}</b>
            <br />
            Posted on{' '}
            <b>
              {<Moment format='YYYY/MM/DD @ HH:MM'>{post.createdAt}</Moment>}
            </b>
          </div>
        </section>
        <hr />
        <section className='comments-section'>
          {!loading && post && <Comments post={post} />}
        </section>
        {/* </div> */}
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      </React.Fragment>
    )
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(PostPage);
