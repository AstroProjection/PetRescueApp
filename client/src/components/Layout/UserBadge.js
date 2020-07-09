import React from 'react';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';

const UserBadge = ({ auth: { user } }) => {
  return (
    <React.Fragment>
      {user ? (
        <h5>
          <Badge className='userbadge'>
            <i className='fa fa-user' /> Welcome <>{user.name}</>
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
