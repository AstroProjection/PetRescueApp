import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostsComponent from '../Posts/PostsComponent';
import { loadUser } from '../../store/actions/auth';
// import UserBadge from '../Layout/UserBadge';
// import setAuthToken from '../../utils/setAuthToken';
const Home = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    // console.log('home useEffect');
    // loadUser();
  }, []);
  return (
    <React.Fragment>
      {/* <UserBadge /> */}
      <PostsComponent />
    </React.Fragment>
  );
};

Home.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Home);
