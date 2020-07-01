import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

import { connect } from 'react-redux';

const AlertComp = ({ alerts }) => {
  return (
    alert !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert
        key={alert.id}
        variant={`${alert.alertType}`}
        className='animate-alert'
      >
        {alert.message}
      </Alert>
    ))
  );
};

AlertComp.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(AlertComp);
