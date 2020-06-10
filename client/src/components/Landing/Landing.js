import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
const Landing = ({ auth: { user } }) => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Pet RescYou</h1>
        <p>This is the pet RescYou landing page!</p>
      </Container>
    </Jumbotron>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
