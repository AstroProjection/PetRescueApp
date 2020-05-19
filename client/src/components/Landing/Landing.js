import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
const Landing = (props) => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Pet RescYou</h1>
        <p>This is the pet RescYou landing page!</p>
      </Container>
    </Jumbotron>
  );
};

Landing.propTypes = {};

export default Landing;
