import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdditionalInfo from './AdditionalInfo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import bsCustomFileInput from 'bs-custom-file-input';

import Spinner from '../Layout/Spinner';

import { useSelector } from 'react-redux';
import { addAnimal } from '../../store/actions/animal';
import mapData from '../../resources/victoria-layout.json';

export const VaccineContext = React.createContext({});

const AddPost = (props) => {
  let locations = mapData.features;
  locations = locations.map((feature) => {
    return {
      displayName: feature.properties.displayName,
      name: feature.properties.name,
    };
  });

  locations.sort((locationA, locationB) =>
    locationA.name > locationB.name ? 1 : -1
  );

  const [vaccineArr, setVaccineArr] = React.useState([]);

  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = (e) => {
    e.preventDefault();
    let formSubmit = new FormData(e.target);
    // console.log(vaccineArr);
    if (vaccineArr.length > 0) {
      for (let vaccine of vaccineArr) {
        vaccine = JSON.stringify(vaccine);
        formSubmit.append('vaccine-arr', vaccine);
      }
    } else {
      // let emptyString = JSON.stringify('');
      // formSubmit.set('vaccine-arr', emptyString);
    }

    addAnimal(formSubmit);
    props.onHide();
  };

  const { addAnimal, ...rest } = props;

  return (
    <Modal
      {...rest}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      {!loading ? (
        <React.Fragment>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter' size='sm'>
              Add an Animal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => onSubmit(e)} noValidate={true}>
              <FormFile custom>
                <FormFile.Input
                  name='image'
                  size='sm'
                  onChange={(e) => {
                    bsCustomFileInput.init();
                  }}
                />
                <FormFile.Label>Add image</FormFile.Label>
              </FormFile>
              <Form.Group controlId='addpost-title'>
                <Row>
                  <Col md={6}>
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                      name='name'
                      type='text'
                      size='sm'
                      placeholder='enter the animals name...'
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Type*</Form.Label>
                    <Form.Control as='select' name='type' size='sm'>
                      <option value='dog'>Dog</option>
                      <option value='cat'>Cat</option>
                    </Form.Control>
                  </Col>
                  <Col md={3}>
                    <Form.Label>Stray/Pet*</Form.Label>
                    <Form.Control as='select' name='identity' size='sm'>
                      <option value='0'>Stray</option>
                      <option value='1'>Pet</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId='addpost-text'>
                <Row>
                  <Col md={5}>
                    <Form.Label>Locality:</Form.Label>
                    <Form.Control
                      as='input'
                      disabled
                      name='locality'
                      size='sm'
                      value={`Victoria Layout`}
                    ></Form.Control>
                  </Col>
                  <Col md={7}>
                    <Form.Label>Location*</Form.Label>
                    <Form.Control as='select' name='location' size='sm'>
                      {locations.length > 0 ? (
                        <React.Fragment>
                          {locations.map(
                            ({ displayName: streetName, name }, index) => {
                              return (
                                <option key={index} value={name}>
                                  {streetName}
                                </option>
                              );
                            }
                          )}
                        </React.Fragment>
                      ) : (
                        ''
                      )}
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <hr />
              <VaccineContext.Provider value={{ vaccineArr, setVaccineArr }}>
                <AdditionalInfo />
              </VaccineContext.Provider>
              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </Modal>
  );
};

AddPost.propTypes = {
  addAnimal: PropTypes.func.isRequired,
};

export default connect(null, { addAnimal })(React.memo(AddPost));
