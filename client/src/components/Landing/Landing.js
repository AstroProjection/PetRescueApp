import React from 'react';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Landing = ({ auth: { user, isLoggedin } }) => {
  if (isLoggedin) return <Navigate to='/home' replace />;
  return (
    <div className='landing p-5'>
      <Container className='container-class'>
        <h1>
          <i className='fas fa-paw'></i>Pet RescYou
        </h1>
        <p>
          The <b>animal tracker</b> Tab has a map for easy visualization!
        </p>
        <p>
          You can post incident reports on the <b>home</b> page
        </p>
        <br />
        <p>Anyone can view what's on the webpages!</p>
        <p>
          You will need to <b>register</b> to post on the website!
        </p>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
