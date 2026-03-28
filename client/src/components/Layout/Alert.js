import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../store/slices/alertSlice';
import { Alert, AlertIcon, AlertDescription, CloseButton, VStack } from '@chakra-ui/react';

const mapVariant = (alertType) => {
  if (alertType === 'danger') return 'error';
  if (alertType === 'success') return 'success';
  if (alertType === 'warning') return 'warning';
  return 'info';
};

const AlertComp = ({ alerts, removeAlert }) => {
  return (
    alerts !== null &&
    alerts.length > 0 && (
      <VStack spacing={3} mb={4} align="stretch" w="full" zIndex={10}>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            status={mapVariant(alert.alertType)}
            variant="solid"
            borderRadius="md"
            boxShadow="md"
          >
            <AlertIcon />
            <AlertDescription flex="1">{alert.message}</AlertDescription>
            {alert.dismissible && (
              <CloseButton alignSelf='flex-start' position='relative' right={-1} top={-1} onClick={() => removeAlert(alert.id)} />
            )}
          </Alert>
        ))}
      </VStack>
    )
  );
};

AlertComp.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(AlertComp);
