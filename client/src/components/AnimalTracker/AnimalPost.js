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

  // const [showAddInfo, setAddInfo] = React.useState(false);
  const [vaccineArr, setVaccineArr] = React.useState([]);

  const loading = useSelector((state) => state.auth.loading);

  const onChange = (e) => {};

  const onSubmit = (e) => {
    e.preventDefault();
    let formSubmit = new FormData(e.target);
    // console.log(vaccineArr);
    for (let vaccine of vaccineArr) {
      vaccine = JSON.stringify(vaccine);
      formSubmit.append('vaccine-arr', vaccine);
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
            <Modal.Title
              id='contained-modal-title-vcenter'
              size='sm'
              onChange={(e) => onChange(e)}
            >
              Add an Animal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => onSubmit(e)}>
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
                  <Col md={9}>
                    <Form.Label>Name*</Form.Label>
                    <Form.Control
                      name='name'
                      type='text'
                      size='sm'
                      placeholder='enter the animals name...'
                      onChange={(e) => onChange(e)}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Type*</Form.Label>
                    <Form.Control
                      as='select'
                      name='type'
                      onChange={(e) => onChange(e)}
                      size='sm'
                    >
                      <option value='dog'>dog</option>
                      <option value='cat'>cat</option>
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
                      onChange={(e) => onChange(e)}
                    ></Form.Control>
                  </Col>
                  <Col md={7}>
                    <Form.Label>Location*</Form.Label>
                    <Form.Control
                      as='select'
                      name='location'
                      size='sm'
                      onChange={(e) => onChange(e)}
                    >
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
