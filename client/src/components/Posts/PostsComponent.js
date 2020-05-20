import React from 'react';
import PostButtons from './PostButtons';
import Posts from './../Posts/Posts';

const PostsComponent = (props) => {
  return (
    <React.Fragment>
      <section className='container'>
        <PostButtons />
        <Posts />
      </section>
    </React.Fragment>
  );
};

export default PostsComponent;
