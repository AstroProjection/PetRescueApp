import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SpayInfo = ({ handleChange, handleBlur }) => {
  const [showInfo, setShowInfo] = React.useState(false);

  // console.log(showInfo);
  return (
    <React.Fragment>
      <Row>
        <Col lg={4}>
          <InputGroup.Prepend id='basic-addon1'>
            <InputGroup.Text className='mr-2'>Neutered?</InputGroup.Text>
            <Form.Control
              as='select'
              placeholder='select an option'
              aria-describedby='basic-addon1'
              name='spayed-value'
              size='sm'
              default='default'
              onChange={(e) => {
                // console.log(e.currentTarget.value);
                handleChange(e);
                parseInt(e.currentTarget.value) === 1
                  ? setShowInfo(true)
                  : setShowInfo(false);
              }}
            >
              <option value='default' disabled={true}>
                Select an option
              </option>
              <option value='2'>Don't know</option>
              <option value='1'>Yes</option>
              <option value='0'>No</option>
            </Form.Control>
          </InputGroup.Prepend>
        </Col>
        {showInfo && (
          <React.Fragment>
            <Col lg={5}>
              <InputGroup.Prepend id='basic-addon2'>
                <InputGroup.Text className='mr-2'>Which vet?</InputGroup.Text>
                <Form.Control
                  as='input'
                  placeholder='optional..'
                  // aria-describedby='basic-addon1'
                  name='spayed-hospital'
                  size='sm'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputGroup.Prepend>
            </Col>
            <Col lg={3}>
              <InputGroup.Prepend id='basic-addon3'>
                <InputGroup.Text className='mr-2'>Date:</InputGroup.Text>
                <Form.Control
                  as='input'
                  placeholder='optional..'
                  // aria-describedby='basic-addon1'
                  name='spayed-date'
                  size='sm'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputGroup.Prepend>
            </Col>
          </React.Fragment>
        )}
      </Row>
    </React.Fragment>
  );
};

export default SpayInfo;
