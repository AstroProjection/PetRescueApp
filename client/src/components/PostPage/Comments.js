import React from 'react';
import CommentsHeader from './CommentsHeader';
import CommentItem from './CommentItem';
import { Box, Text } from '@chakra-ui/react';

const Comments = ({ post }) => {
  return (
    <Box>
      <CommentsHeader post={post} />

      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment) => (
          <CommentItem comment={comment} key={comment._id} post={post} />
        ))
      ) : (
        <Text color="gray.500" fontStyle="italic" textAlign="center" py={4}>
          No comments yet. Be the first to reply!
        </Text>
      )}
    </Box>
  );
};

export default Comments;
