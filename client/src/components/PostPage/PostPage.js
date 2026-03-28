import React from 'react';
import { getPost } from '../../store/slices/postSlice';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Comments from './Comments';
import Spinner from '../Layout/Spinner';

import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Divider,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';

const PostPage = ({ post: { post, loading }, getPost }) => {
  const { postId } = useParams();

  React.useEffect(() => {
    getPost(postId);
  }, [getPost, postId]);

  const position =
    post && post.locationState && post.locationState.center.length > 0
      ? [post.locationState.center[0], post.locationState.center[1]]
      : null;

  if (loading || !post) return <Box py={20} textAlign="center"><Spinner /></Box>;

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8} mb={8}>
        {/* Left Side: Images & Maps */}
        {(post.image || position) && (
          <VStack flex={{ base: "none", md: "1" }} w={{ base: "100%", md: "50%" }} spacing={4} align="stretch">
            {post.image && (
              <Box borderRadius="xl" overflow="hidden" boxShadow="md" bg="gray.100" maxH="500px">
                <Image src={post.image} alt={post.title} objectFit="contain" w="100%" h="100%" />
              </Box>
            )}

            {position && (
              <Box borderRadius="xl" overflow="hidden" boxShadow="md" h="300px" borderWidth="1px" borderColor="gray.200">
                <MapContainer
                  style={{ height: '100%', width: '100%', zIndex: 1 }}
                  center={post.locationState.center}
                  zoom={post.locationState.zoom}
                  dragging={false}
                  keyboard={false}
                  scrollWheelZoom={false}
                  tap={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    attribution='&amp;copy OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker position={position}></Marker>
                </MapContainer>
              </Box>
            )}
          </VStack>
        )}

        {/* Right Side: Details */}
        <Box flex={{ base: "none", md: (post.image || position) ? "1" : "none" }} w={{ base: "100%", md: (post.image || position) ? "50%" : "container.md" }} mx="auto" bg="white" p={6} borderRadius="xl" boxShadow="sm" borderWidth="1px" borderColor="gray.100">
          <HStack mb={4} spacing={2}>
            <Badge colorScheme={post.status === 'Open' ? 'green' : 'gray'} px={2} py={1} borderRadius="md">{post.status}</Badge>
            <Badge colorScheme="purple" px={2} py={1} borderRadius="md">{post.tag}</Badge>
            <Badge colorScheme={post.urgency === 'high' ? 'red' : 'orange'} px={2} py={1} borderRadius="md" textTransform="uppercase">
              {post.urgency} Priority
            </Badge>
          </HStack>

          <Heading size="xl" color="brand.700" mb={4}>{post.title}</Heading>
          
          <Text fontSize="lg" color="gray.700" mb={8} whiteSpace="pre-wrap">
            {post.text}
          </Text>

          <Box mt="auto" p={4} bg="gray.50" borderRadius="lg" borderLeftWidth="4px" borderLeftColor="brand.400">
            <Text fontWeight="bold" color="gray.800">
              <i className="fas fa-user" style={{ marginRight: '8px' }}></i> {post.user.name}
            </Text>
            <Text fontSize="sm" color="gray.600" mt={1}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i> {post.user?.locality?.locality || 'Unknown Locality'}
            </Text>
            <Text fontSize="sm" color="gray.500" mt={2}>
              <i className="fas fa-clock" style={{ marginRight: '8px' }}></i> {moment(post.createdAt).format('MMMM Do YYYY, h:mm a')}
            </Text>
          </Box>
        </Box>
      </Flex>

      <Divider my={8} borderColor="brand.200" borderWidth="2px" />

      {/* Embedded Comments Section (Wait, does Comments use tracking/react-bootstrap?) */}
      <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" borderWidth="1px" borderColor="gray.100">
        <Heading size="md" mb={6} color="gray.800">
          <i className="far fa-comments" style={{ marginRight: '8px' }}></i> Comments
        </Heading>
        <Comments post={post} />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(PostPage);
