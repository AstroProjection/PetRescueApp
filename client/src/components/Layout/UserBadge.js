import React from 'react';
import { connect } from 'react-redux';
import { Badge, Box } from '@chakra-ui/react';

const UserBadge = ({ auth: { user } }) => {
  return (
    <React.Fragment>
      {user ? (
        <Box textAlign="center" my={2}>
          <Badge colorScheme="brand" variant="subtle" fontSize="md" px={3} py={1} borderRadius="full">
            <i className='fa fa-user' style={{ marginRight: '5px' }} /> Welcome {user.name}
          </Badge>
        </Box>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserBadge);
