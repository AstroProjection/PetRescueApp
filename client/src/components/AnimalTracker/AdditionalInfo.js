import React from 'react';
import Form from 'react-bootstrap/Form';
import VaccineInfo from './VaccineInfo';
import SpayInfo from './SpayInfo';

const AdditionalInfo = ({
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  setValues,
}) => {
  return (
    <React.Fragment>
      <h5>
        <em>Additional Info.</em>
      </h5>
      <hr />
      <Form.Group>
        <SpayInfo
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          values={values}
        />
        <hr />
        <VaccineInfo
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          values={values}
          setValues={setValues}
        />
      </Form.Group>
    </React.Fragment>
  );
};

AdditionalInfo.propTypes = {};

export default AdditionalInfo;
