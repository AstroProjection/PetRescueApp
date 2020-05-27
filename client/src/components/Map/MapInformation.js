import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MapInformation = ({ animals }) => {
  return (
    <div>
      <h1>Information</h1>
      <div>
        Information box:
        <br />
        Total count:
        <br />
        Dogs:{animals.dogs.length}
        <br />
        Cats:{animals.cats.length}
      </div>
    </div>
  );
};

MapInformation.propTypes = {
  animals: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  animals: state.animals,
});

export default connect(mapStateToProps)(MapInformation);
