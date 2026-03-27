import React, { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Whatsapp from './Whatsapp';
import { connect } from 'react-redux';
import { uploadImage, removePost } from '../../store/slices/postSlice';

import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  IconButton,
  Button,
  VStack,
  HStack,
  Spacer,
  useToast,
  Heading,
} from '@chakra-ui/react';

const Post = ({
  user: { name, _id: postUser },
  auth,
  uploadImage,
  removePost,
  comments,
  setEditModal,
  editModal,
  post,
  setEditPost,
}) => {
  const { _id, image, title, text, tag, status, createdAt, urgency } = post;
  const fileUploadRef = useRef(null);
  const toast = useToast();
  const loggedUser = auth.user ? auth.user._id : null;

  const handleImageUpload = (e) => {
    let formData = new FormData();
    formData.append('image', e.target.files[0]);
    uploadImage(formData, _id);
  };

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this post?')) {
      removePost(_id);
      toast({
        title: 'Post deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  let urgencyColor = 'green';
  if (urgency === 'mid') urgencyColor = 'orange';
  if (urgency === 'high') urgencyColor = 'red';

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <Flex direction={{ base: 'column', md: 'row' }}>
        {/* Image Section */}
        <Box 
          w={{ base: '100%', md: '250px' }} 
          h={{ base: '200px', md: 'auto' }} 
          bg="gray.100" 
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {image ? (
            <Image src={image} alt="Post image" objectFit="cover" w="100%" h="100%" />
          ) : (
            <VStack>
              {loggedUser === postUser && !auth.loading ? (
                <>
                  <input
                    type='file'
                    ref={fileUploadRef}
                    accept='image/png, image/jpeg'
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  <Button size="sm" colorScheme="brand" variant="outline" onClick={() => fileUploadRef.current.click()}>
                    <i className="fas fa-camera" style={{ marginRight: '8px' }}></i> Add Image
                  </Button>
                </>
              ) : (
                <Text color="gray.400" fontSize="sm"><i className="fas fa-image"></i> No Image</Text>
              )}
            </VStack>
          )}
        </Box>

        {/* Content Section */}
        <Box p={5} flex="1" display="flex" flexDirection="column">
          <HStack mb={2}>
            <Badge colorScheme={urgencyColor} px={2} py={1} borderRadius="md" textTransform="uppercase">
              {urgency} Priority
            </Badge>
            <Badge colorScheme={status === 'Open' ? 'green' : 'gray'} px={2} py={1} borderRadius="md">
              {status}
            </Badge>
            <Badge colorScheme="purple" px={2} py={1} borderRadius="md">
              {tag}
            </Badge>
          </HStack>
          
          <Heading size="md" mb={2} color="gray.800">{title}</Heading>
          <Text color="gray.600" mb={4} noOfLines={3}>
            {text}
          </Text>
          
          <Spacer />
          
          <HStack justify="space-between" align="center" mt={4} pt={4} borderTopWidth="1px" borderColor="gray.100">
            <VStack align="start" spacing={0}>
              <Text fontSize="sm" fontWeight="bold" color="gray.700">
                <i className='fas fa-user' style={{ marginRight: '5px' }}></i> {name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {moment(createdAt).format('MMMM Do YYYY, h:mm a')}
              </Text>
            </VStack>

            <HStack spacing={3}>
              <Box>
                <Whatsapp postURL={_id} />
              </Box>
              <Button as={RouterLink} to={`/post/${_id}`} size="sm" variant="ghost" colorScheme="brand">
                <i className='far fa-comment-alt' style={{ marginRight: '5px' }}></i> {comments}
              </Button>

              {loggedUser === postUser && (
                <HStack spacing={1}>
                  <IconButton
                    size="sm"
                    icon={<i className='fas fa-edit'></i>}
                    aria-label="Edit Post"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => {
                      setEditPost({ ...post });
                      setEditModal(true);
                    }}
                  />
                  <IconButton
                    size="sm"
                    icon={<i className='fas fa-trash'></i>}
                    aria-label="Delete Post"
                    variant="ghost"
                    colorScheme="red"
                    onClick={handleDelete}
                  />
                </HStack>
              )}
            </HStack>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadImage, removePost })(Post);
