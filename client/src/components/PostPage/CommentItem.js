import React from 'react';
import moment from 'moment';
import { removeComment } from '../../store/slices/postSlice';
import { connect } from 'react-redux';
import { Box, Flex, Avatar, Text, IconButton, HStack, Spacer } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const CommentItem = ({ comment, removeComment, post, user }) => {
  const canDelete = user
    ? user._id === comment.user_id || post.user._id === user._id
    : false;

  return (
    <Box p={4} mb={3} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.100" shadow="sm">
      <Flex direction="column">
        <HStack mb={2}>
          <Avatar size="sm" name={comment.name} src="/blank-user.webp" />
          <Text fontWeight="bold" fontSize="sm">{comment.name}</Text>
          <Spacer />
          {canDelete && (
             <IconButton 
               size="xs" 
               icon={<DeleteIcon />} 
               colorScheme="red" 
               variant="ghost" 
               aria-label="Delete comment" 
               onClick={() => removeComment({ postId: post._id, commentId: comment._id })} 
             />
          )}
        </HStack>
        <Text color="gray.800" fontSize="md" mb={2} whiteSpace="pre-wrap">
          {comment.text}
        </Text>
        <Text fontSize="xs" color="gray.500">
          Posted on {moment(comment.createdAt || comment.date).format('MMMM Do YYYY, h:mm a')}
        </Text>
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { removeComment })(React.memo(CommentItem));
