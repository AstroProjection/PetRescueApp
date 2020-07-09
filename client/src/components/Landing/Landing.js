import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Landing = ({ auth: { user, isLoggedin } }) => {
  if (isLoggedin) return <Redirect to='/home' />;
  return (
    <Jumbotron fluid className='landing'>
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
    </Jumbotron>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
