import React from 'react';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';

const UserBadge = ({ auth: { user } }) => {
  return (
    <React.Fragment>
      {user ? (
        <h5>
          <Badge variant='light'>
            <i className='fa fa-user' /> Welcome <b>{user.name}</b>
          </Badge>
        </h5>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserBadge);
