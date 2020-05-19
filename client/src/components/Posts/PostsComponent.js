import React from 'react';
import PropTypes from 'prop-types';
import PostButtons from './../Buttons/PostButtons';
import Posts from './../Posts/Posts';

const PostsComponent = (props) => {
  return (
    <React.Fragment>
      <PostButtons />
      <Posts />
    </React.Fragment>
  );
};

PostsComponent.propTypes = {};

export default PostsComponent;
