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

import { Formik } from 'formik';
import * as yup from 'yup';

export const VaccineContext = React.createContext({});

const animalPostSchema = yup.object({
  image: yup.mixed().notRequired(),
  name: yup.string().required('Please enter a name'),
  type: yup.string().required('Select an option'),
  identity: yup.string().required('Select an option'),
  locality: yup.string().required(),
  location: yup.string().required('Select an option'),
  spayedValue: yup.string().required('Select an option'),
  spayedHospital: yup.string().notRequired(),
  spayedDate: yup.date().notRequired(),
  vaccineArr: yup.array().of(
    yup.object({
      vaccinename: yup.string().required('Enter vaccine name'),
      vaccineDateTaken: yup.date().notRequired(),
      vaccineDateDue: yup.date().notRequired(),
    })
  ),
});

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
  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = (e) => {
    let formSubmit = new FormData();
    for (const [key, value] of Object.entries(e)) {
      if (key !== 'vaccineArr') formSubmit.append(key, value);
    }

    for (const element of e.vaccineArr) {
      formSubmit.append('vaccineArr[]', JSON.stringify(element));
    }

    addAnimal(formSubmit);
    // props.onHide();
  };

  const { addAnimal, street, ...rest } = props;

  return (
    <Modal {...rest} size='lg' centered>
      {!loading ? (
        <React.Fragment>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter' size='sm'>
              Add an Animal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              validationSchema={animalPostSchema}
              initialValues={{
                image: '',
                name: '',
                type: '',
                identity: '',
                locality: 'victoria-layout',
                location: street ? street.streetname : '8th-cross',
                spayedValue: '',
                spayedHospital: '',
                spayedDate: new Date(),
                vaccineArr: [],
              }}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setValues,
                touched,
              }) => (
                <Form onSubmit={handleSubmit} noValidate={true}>
                  <FormFile custom>
                    <FormFile.Label>Add image</FormFile.Label>
                    <FormFile.Input
                      name='image'
                      type='file'
                      size='sm'
                      accept='image/**'
                      onChange={(e) => {
                        let file = e.currentTarget.files[0];
                        setFieldValue('image', file);

                        bsCustomFileInput.init();
                      }}
                    />
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
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && !!errors.name}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.name}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={3}>
                        <Form.Label>Type*</Form.Label>
                        <Form.Control
                          as='select'
                          name='type'
                          size='sm'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={'default'}
                          isInvalid={touched.type && !!errors.type}
                        >
                          <option value='default' disabled={true}>
                            Select an option
                          </option>
                          <option value='dog'>Dog</option>
                          <option value='cat'>Cat</option>
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                          {errors.type}
                        </Form.Control.Feedback>
                      </Col>
                      <Col md={3}>
                        <Form.Label>Stray/Pet*</Form.Label>
                        <Form.Control
                          as='select'
                          name='identity'
                          size='sm'
                          // defaultValue={'0'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.identity && !!errors.identity}
                          defaultValue={'default'}
                        >
                          <option value='default' disabled={true}>
                            Select an option
                          </option>
                          <option value='1'>Pet</option>
                          <option value='0'>Stray</option>
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                          {errors.identity}
                        </Form.Control.Feedback>
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
                          value={street.locality.locality}
                        ></Form.Control>
                      </Col>
                      <Col md={7}>
                        <Form.Label>Location*</Form.Label>
                        <Form.Control
                          as='input'
                          name='location'
                          size='sm'
                          // onChange={handleChange}
                          value={street.displayName}
                          disabled
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.location}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Form.Group>
                  <hr />
                  <AdditionalInfo
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    values={values}
                    setValues={setValues}
                  />
                  <Button type='submit'>Submit</Button>
                  <pre>{JSON.stringify(values, null, 2)} </pre>
                  {/* <pre>{JSON.stringify(errors, null, 2)} </pre> */}
                </Form>
              )}
            </Formik>
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

const mapStateToProps = (state) => ({
  street: state.street.street,
});

export default connect(mapStateToProps, { addAnimal })(React.memo(AddPost));
