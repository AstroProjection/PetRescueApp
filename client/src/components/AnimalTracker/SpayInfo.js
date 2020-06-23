import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

const SpayInfo = (props) => {
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
            >
              <option value='2'>Don't know</option>
              <option value='1'>Yes</option>
              <option value='0'>No</option>
            </Form.Control>
          </InputGroup.Prepend>
        </Col>
        <Col lg={5}>
          <InputGroup.Prepend id='basic-addon2'>
            <InputGroup.Text className='mr-2'>Which vet?</InputGroup.Text>
            <Form.Control
              as='input'
              placeholder='optional..'
              // aria-describedby='basic-addon1'
              name='spayed-hospital'
              size='sm'
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
            />
          </InputGroup.Prepend>
        </Col>
      </Row>
    </React.Fragment>
  );
};

SpayInfo.propTypes = {};

export default SpayInfo;
