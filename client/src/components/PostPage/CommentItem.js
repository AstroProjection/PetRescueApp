import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { removeComment } from '../../store/actions/post';
import { connect } from 'react-redux';
const CommentItem = (props) => {
  const { comment, removeComment, post, user } = props;

  const canDelete = user
    ? user._id === comment.user || post.user._id === user._id
    : false;

  return (
    <div className='post  p-1 my-1'>
      <div className='comment-heading'>
        <a>
          <img
            className='round-img'
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            alt=''
          />
        </a>
        <p>
          <b>{comment.name}</b>
        </p>
      </div>
      <div>
        <p className='my-1 comment-text'>{comment.text}</p>
        <p className='comment-date'>
          Posted on{' '}
          <Moment format='YYYY/MM/DD HH:mm:ss'>{comment.createdAt}</Moment>
        </p>
      </div>
      {canDelete && (
        <div
          className='delete-button btn'
          onClick={(e) => removeComment(post._id, comment._id)}
        >
          Delete
        </div>
      )}
      {/* {JSON.stringify(comment, null, 2)} */}
      {/* {JSON.stringify(post, null, 2)} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
