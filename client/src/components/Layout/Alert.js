import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { removeAlert } from '../../store/actions/alert';

const AlertComp = ({ alerts, removeAlert }) => {
  return (
    alert !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert
        key={alert.id}
        variant={`${alert.alertType}`}
        className='animate-alert'
        dismissible={alert.dismissible}
        onClose={() => removeAlert(alert.id)}
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

export default connect(mapStateToProps, { removeAlert })(AlertComp);
