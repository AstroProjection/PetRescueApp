import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Geolocation from './Geolocation';

import Spinner from '../Layout/Spinner';

import { useSelector, connect } from 'react-redux';
import { createPost } from '../../store/slices/postSlice';

import { Formik } from 'formik';
import * as yup from 'yup';

const postValidationSchema = yup.object({
  title: yup
    .string()
    .required('Please enter a title')
    .min(5, 'Title must be at least 5 characters')
    .max(80, 'Title cannot be more than 80 characters'),
  text: yup.string().required('Please enter a description'),
  image: yup.mixed().notRequired(),
  tag: yup.string().required('Please choose a tag'),
  urgency: yup.string().required('Set the urgency'),
});
const postTags = [
  ['Injury', 'Injury'],
  ['Hunger', 'Hunger'],
  ['Missing', 'Missing'],
  ['Vaccination', 'Vaccination'],
];

const urgencyTags = [
  ['low', 'Low '],
  ['mid', 'Medium'],
  ['high', 'High'],
];
const AddPost = ({ isMobile, createPost, ...props }) => {
  // value | HTML

  const initLocationState = {
    center: [],
    zoom: 17,
  };
  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = (e) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(e)) {
      if (key !== 'locationState') formData.append(key, value);
      else formData.append(key, JSON.stringify(value));
    }
    createPost(formData);
    // props.onHide();
  };

  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      {...props}
    >
      {!loading ? (
        <React.Fragment>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter' name='title'>
              Add a Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              onSubmit={onSubmit}
              initialValues={{
                title: '',
                text: '',
                image: '',
                tag: '',
                urgency: '',
                showLocation: isMobile ? false : true,
                locationState: initLocationState,
              }}
              validationSchema={postValidationSchema}
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                touched,
                setFieldValue,
                values,
              }) => (
                <Form onSubmit={handleSubmit} noValidate={true}>
                  <Form.Group controlId='addpost-image'>
                    <Form.Label>Add image</Form.Label>
                    <Form.Control
                      type='file'
                      name='image'
                      accept='image/jpeg,image/png'
                      onChange={(e) =>
                        setFieldValue('image', e.currentTarget.files[0])
                      }
                    />
                  </Form.Group>
                  <Row>
                    <Col lg={6}>
                      <Form.Group controlId='addpost-title'>
                        <Form.Label>Title*</Form.Label>
                        <Form.Control
                          name='title'
                          type='text'
                          autoComplete='new-password'
                          placeholder='enter title here...'
                          onChange={handleChange}
                          isInvalid={touched.title && !!errors.title}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.title}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={3} sm={6}>
                      <Form.Group controlId='addpost-title'>
                        <Form.Label>Tag*</Form.Label>
                        <Form.Control
                          name='tag'
                          as='select'
                          autoComplete='new-password'
                          // placeholder='Please select an option...'
                          defaultValue={''}
                          onChange={handleChange}
                          isInvalid={touched.tag && !!errors.tag}
                        >
                          <option value='' disabled={true}>
                            select an option
                          </option>
                          {postTags.map((tag, index) => (
                            <option key={index} value={tag[0]}>
                              {tag[1]}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                          {errors.tag}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={3} sm={6}>
                      <Form.Group controlId='addpost-title'>
                        <Form.Label>Urgency*</Form.Label>
                        <Form.Control
                          name='urgency'
                          as='select'
                          autoComplete='new-password'
                          // placeholder='Please select an option...'
                          defaultValue={''}
                          onChange={handleChange}
                          isInvalid={touched.urgency && !!errors.urgency}
                        >
                          <option value='' disabled={true}>
                            select an option
                          </option>
                          {urgencyTags.map((tag, index) => (
                            <option key={index} value={tag[0]}>
                              {tag[1]}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                          {errors.tag}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId='addpost-text'>
                    <Form.Label>Description*</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows='2'
                      name='text'
                      onChange={handleChange}
                      isInvalid={touched.text && !!errors.text}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.text}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {!isMobile && (
                    <Form.Check
                      type='checkbox'
                      name='showLocation'
                      label='Add Location'
                      checked={values.showLocation}
                      onChange={(e) => {
                        if (values.showLocation)
                          setFieldValue('locationState', initLocationState);
                        handleChange(e);
                      }}
                    />
                  )}
                  {values.showLocation && (
                    <Form.Group>
                      <Geolocation
                        values={values}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                      />
                    </Form.Group>
                  )}

                  <Button type='submit'>Submit</Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
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

AddPost.propTypes = {};

const mapStateToProps = (state) => ({
  isMobile: state.device.isMobile,
});

export default connect(mapStateToProps, { createPost })(React.memo(AddPost));
