import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import 'react-datepicker/dist/react-datepicker.css';

import { v4 as uuidv4 } from 'uuid';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import VaccineItem from './VaccineItem';
// import { VaccineContext } from './AnimalPost';

import { FieldArray } from 'formik';

const VaccineInfo = ({
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  setValues,
}) => {
  const [checked, setChecked] = React.useState(false);

  const showVaccine = (e) => {
    setChecked(e.currentTarget.checked);
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={5}>
          <InputGroup className='mb-3'>
            <InputGroup.Prepend>
              <InputGroup.Checkbox onChange={(e) => showVaccine(e)} />
            </InputGroup.Prepend>
            <Form.Control disabled value=' Show vaccination tab' />
          </InputGroup>
        </Col>
      </Row>

      {checked && (
        <Row>
          <Col lg={9}>
            <Form.Label>
              <strong>Enter vaccination info(if available) </strong>
            </Form.Label>
            <InputGroup className='mr-2'>
              <div className='table'>
                <div className='tr'>
                  <div className='td'>
                    <strong>Vaccine Name</strong>
                  </div>
                  <div className='td'>
                    <strong>Date taken</strong>
                  </div>
                  <div className='td'>
                    <strong>Due Date</strong>
                  </div>
                </div>
                <FieldArray name='vaccineArr'>
                  {(arrayHelpers) => {
                    return (
                      <React.Fragment>
                        {values.vaccineArr.length > 0 ? (
                          values.vaccineArr.map((vac, index) => {
                            return (
                              <VaccineItem
                                values={values}
                                index={index}
                                vaccine={vac}
                                key={index}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                arrayHelpers={arrayHelpers}
                              />
                            );
                          })
                        ) : (
                          <>None</>
                        )}
                      </React.Fragment>
                    );
                  }}
                </FieldArray>
              </div>
              <Form.Control
                as='button'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  values.vaccineArr.push({
                    vaccinename: '',
                    vaccineDateTaken: new Date().now,
                    vaccineDateDue: new Date().now,
                    id: uuidv4(),
                  });
                  setValues(values);
                }}
              >
                <strong>
                  Add vaccine <i className='fas fa-plus'></i>
                </strong>
              </Form.Control>
            </InputGroup>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default VaccineInfo;
