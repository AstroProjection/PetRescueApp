import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Geolocation from './Geolocation';

import bsCustomFileInput from 'bs-custom-file-input';

import Spinner from '../Layout/Spinner';

import { useSelector, connect } from 'react-redux';
import { createPost } from '../../store/actions/post';

import { Formik } from 'formik';
import * as yup from 'yup';

const postValidationSchema = yup.object({
  title: yup
    .string()
    .required('Please enter a title')
    .min(8, 'Title must be at least 8 characters')
    .max(80, 'Title cannot be more than 80 characters'),
  text: yup.string().required('Please enter a description'),
  image: yup.mixed().notRequired(),
  tag: yup.string().required('Please choose a tag'),
  urgency: yup.string().required('Set the urgency'),
});
const postTags = [
  ['injury', 'Medical Attention'],
  ['hunger', 'Hunger'],
  ['tag1', 'Tag1'],
  ['tag2', 'Tag2'],
];

const urgencyTags = [
  ['low', 'Low '],
  ['mid', 'Medium'],
  ['high', 'High'],
];
const AddPost = ({ createPost, ...props }) => {
  /// tags to include for post types
  // value | HTML

  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = (e) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(e)) {
      formData.append(key, value);
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
                showLocation: true,
                locationState: {
                  center: [],
                  zoom: 17,
                },
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
                    <FormFile.Label>Add image</FormFile.Label>
                  </FormFile>
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
                  <Form.Check
                    type='checkbox'
                    name='showLocation'
                    label='Add Location'
                    checked={values.showLocation}
                    onChange={handleChange}
                  />
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
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
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

export default connect(null, { createPost })(AddPost);
