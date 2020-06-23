import React from 'react';
import Form from 'react-bootstrap/Form';
import VaccineInfo from './VaccineInfo';
import SpayInfo from './SpayInfo';

const AdditionalInfo = (props) => {
  return (
    <React.Fragment>
      <h5>
        <em>Additional Info.</em>
      </h5>
      <hr />
      <Form.Group>
        <SpayInfo />
        <hr />
        <VaccineInfo />
      </Form.Group>
    </React.Fragment>
  );
};

AdditionalInfo.propTypes = {};

export default AdditionalInfo;
