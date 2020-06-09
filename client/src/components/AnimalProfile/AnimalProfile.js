import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AnimalProfile = (props) => {
  const {
    name,
    location,
    street: { street },
  } = props;
  return (
    <div className=''>
      Animal Profile
      <br />
      name: {name} <br />
      location: {street.displayName}
    </div>
  );
};

AnimalProfile.propTypes = {};

const mapStateToProps = (state) => ({
  street: state.street,
});

export default connect(mapStateToProps)(AnimalProfile);
