import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Geolocation from './Geolocation';

import bsCustomFileInput from 'bs-custom-file-input';

import Spinner from '../Layout/Spinner';
import { editPost } from '../../store/actions/post';
import { useSelector, connect } from 'react-redux';

import { Formik } from 'formik';
import * as yup from 'yup';

const postValidationSchema = yup.object({
  title: yup
    .string()
    .required('Please enter a title')
    .min(5, 'Title must be at least 8 characters')
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

const statusTags = [
  ['open', 'Open'],
  ['closed', 'Closed'],
];
const EditPost = ({ isMobile, editPost, post, ...props }) => {
  /// tags to include for post types
  // value | HTML
  const initLocationState = {
    center: [],
    zoom: 17,
  };
  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = (e) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(e)) {
      if (key !== 'locationState') {
        formData.append(key, value);
      } else if (key === 'locationState') {
        formData.append(key, JSON.stringify(value));
      }
    }
    editPost(formData, post._id);
    props.onHide();
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
            <Modal.Title id='contained-modal-title-vcenter-1' name='title'>
              Edit Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              onSubmit={onSubmit}
              initialValues={{
                title: post.title,
                text: post.text,
                image: post && post.image ? post.image : '',
                tag: post.tag,
                urgency: post.urgency,
                status: post.status,
                showLocation: isMobile ? false : true,
                locationState: post.locationState,
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
                  <FormFile custom>
                    <FormFile.Input
                      name='image'
                      onChange={(e) => {
                        setFieldValue('image', e.currentTarget.files[0]);
                        bsCustomFileInput.init();
                      }}
                    />
                    <FormFile.Label>New Image:</FormFile.Label>
                  </FormFile>
                  <Row>
                    <Col lg={4}>
                      <Form.Group controlId='addpost-title'>
                        <Form.Label>Title*</Form.Label>
                        <Form.Control
                          name='title'
                          type='text'
                          autoComplete='new-password'
                          placeholder='enter title here...'
                          defaultValue={values.title}
                          onChange={handleChange}
                          isInvalid={touched.title && !!errors.title}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.title}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={4} sm={6}>
                      <Form.Group controlId='addpost-title'>
                        <Form.Label>Tag*</Form.Label>
                        <Form.Control
                          name='tag'
                          as='select'
                          autoComplete='new-password'
                          // placeholder='Please select an option...'
                          defaultValue={values.tag}
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
                    <Col lg={2} sm={6}>
                      <Form.Group controlId='addpost-title'>
                        <Form.Label>Urgency*</Form.Label>
                        <Form.Control
                          name='urgency'
                          as='select'
                          autoComplete='new-password'
                          // placeholder='Please select an option...'
                          defaultValue={values.urgency}
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
                          {errors.urgency}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col lg={2} sm={12}>
                      <Form.Group controlId='addpost-title'>
                        <Form.Label>Status*</Form.Label>
                        <Form.Control
                          name='status'
                          as='select'
                          autoComplete='new-password'
                          // placeholder='Please select an option...'
                          defaultValue={values.status}
                          onChange={handleChange}
                          isInvalid={touched.status && !!errors.status}
                        >
                          <option value='' disabled={true}>
                            select an option
                          </option>
                          {statusTags.map((tag, index) => (
                            <option key={index} value={tag[0]}>
                              {tag[1]}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                          {errors.urgency}
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
                      defaultValue={values.text}
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
                  <pre>{JSON.stringify(values, null, 2)}</pre>
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

EditPost.propTypes = {
  editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isMobile: state.device.isMobile,
});

export default connect(mapStateToProps, { editPost })(EditPost);
