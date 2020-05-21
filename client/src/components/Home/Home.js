import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostsComponent from '../Posts/PostsComponent';
import Badge from 'react-bootstrap/Badge';
import { loadUser } from '../../store/actions/auth';
import setAuthToken from '../../utils/setAuthToken';
const Home = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <React.Fragment>
      {user ? (
        <h3>
          <Badge variant='light'>
            <i className='fa fa-user' /> Welcome <b>{user.name}</b>
          </Badge>
        </h3>
      ) : (
        ''
      )}

      <PostsComponent />
    </React.Fragment>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Home);
