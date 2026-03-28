import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, Heading, Text, VStack, Icon } from '@chakra-ui/react';

const Landing = ({ auth: { user, isLoggedin } }) => {
  if (isLoggedin) return <Navigate to='/home' replace />;
  
  return (
    <Box py={20} px={6} textAlign="center" bg="white" borderRadius="xl" boxShadow="sm" borderWidth="1px" borderColor="gray.100">
      <VStack spacing={6} maxW="container.md" mx="auto">
        <Heading size="2xl" color="brand.600" display="flex" alignItems="center" justifyContent="center">
          <i className='fas fa-paw' style={{ marginRight: '15px' }}></i>Pet RescYou
        </Heading>
        
        <Box fontSize="lg" color="gray.600">
          <Text mb={4}>
            The <b>Animal Tracker</b> tab has a map for easy visualization of pets in your area!
          </Text>
          <Text mb={4}>
            You can post incident reports and updates on the <b>Home</b> page.
          </Text>
          <Text mb={4}>Anyone can view what's on the webpages!</Text>
          <Text>
            You will need to <b>register</b> to actively post on the website!
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
