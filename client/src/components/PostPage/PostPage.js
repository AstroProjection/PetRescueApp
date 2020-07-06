import React from 'react';
import { getPost } from '../../store/actions/post';
import { connect } from 'react-redux';

const PostPage = ({ post, match, getPost }) => {
  React.useEffect(() => {
    getPost(match.params.postId);
  }, [getPost]);
  return <React.Fragment>Post page - {match.params.postId}</React.Fragment>;
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(PostPage);
