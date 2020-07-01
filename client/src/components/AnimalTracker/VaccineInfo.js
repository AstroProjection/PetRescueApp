import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactDatePicker from 'react-date-picker';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import VaccineItem from './VaccineItem';
import { VaccineContext } from './AnimalPost';

const VaccineInfo = (props) => {
  const [dateTaken, setTakenDate] = React.useState('');
  const [dateDue, setDueDate] = React.useState('');

  // console.log(VaccineContext);
  const { vaccineArr, setVaccineArr } = React.useContext(VaccineContext);
  const [vaccineFormData, setVaccineFD] = React.useState({
    vaccinename: '',
    dateTaken: '',
    dateDue: '',
  });
  const { vaccinename: vaccineName } = vaccineFormData;
  const [checked, setChecked] = React.useState(false);
  const addVaccine = (e) => {
    e.preventDefault();
    if (vaccineFormData.vaccinename === '') return;

    setVaccineArr([...vaccineArr, vaccineFormData]);
    setVaccineFD({
      vaccinename: '',
      dateTaken: '',
      dateDue: '',
    });
    setDueDate('');
    setTakenDate('');
  };

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
          <Col lg={6}>
            <Form.Label>
              <strong>Vaccination info</strong>
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
                {vaccineArr.length > 0
                  ? vaccineArr.map((vac, index) => {
                      console.log(vac);
                      return <VaccineItem vaccine={vac} key={index} />;
                    })
                  : 'None..'}
              </div>
            </InputGroup>
            {/* </InputGroup> */}
          </Col>
          <Col lg={6}>
            <strong>Enter vaccination info(if available)</strong>
            <InputGroup.Prepend>
              <InputGroup.Text size='sm'>Vaccine Name:</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as='input'
              name='vaccinename'
              size='sm'
              value={vaccineName}
              onChange={(e) => {
                setVaccineFD({
                  ...vaccineFormData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <Form.Group>
              <Row>
                <Col lg={6} md={6}>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Date given:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <ReactDatePicker
                    value={dateTaken}
                    format={'dd/MM/yyyy'}
                    onChange={(date) => {
                      let dateString = date ? date.toLocaleDateString() : null;
                      setVaccineFD({
                        ...vaccineFormData,
                        dateTaken: dateString,
                      });
                      setTakenDate(date);
                    }}
                  />
                </Col>
                <Col lg={6} md={6}>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Due Date:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <ReactDatePicker
                    value={dateDue}
                    format={`dd/MM/yyyy`}
                    onChange={(date) => {
                      let dateString = date ? date.toLocaleDateString() : null;
                      setVaccineFD({
                        ...vaccineFormData,
                        dateDue: dateString,
                      });
                      setDueDate(date);
                    }}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Control as='button' onClick={(e) => addVaccine(e)}>
              <strong>
                Add vaccine <i className='fas fa-plus'></i>
              </strong>
            </Form.Control>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default VaccineInfo;
