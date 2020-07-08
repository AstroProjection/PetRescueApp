import React from 'react';
import CommentsHeader from './CommentsHeader';
import CommentItem from './CommentItem';

const Comments = (props) => {
  const { post } = props;
  return (
    <div className='post-form'>
      <CommentsHeader post={post} />

      {post.comments.length > 0
        ? post.comments.map((comment) => (
            <CommentItem comment={comment} key={comment._id} post={post} />
          ))
        : 'No comments ...'}
    </div>
  );
};

export default Comments;
