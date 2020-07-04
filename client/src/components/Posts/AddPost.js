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

import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../store/actions/post';

import { Formik } from 'formik';
import * as yup from 'yup';

const postValidationSchema = yup.object({
  title: yup.string().required('Please enter a title'),
  text: yup.string().required('Please enter a description'),
  image: yup.mixed().notRequired(),
});

const AddPost = (props) => {
  /// tags to include for post types
  // value | HTML
  const postTags = [
    ['injury', 'Medical Attention'],
    ['hunger', 'Hunger'],
    ['tag1', 'Tag1'],
    ['tag2', 'Tag2'],
  ];
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(e)) {
      formData.append(key, value);
    }
    dispatch(createPost(formData));
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
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
                locationState: {},
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
                <Form onSubmit={handleSubmit}>
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
                    <Col lg={6}>
                      <Form.Group controlId='addpost-title'>
                        <Form.Label>Tag*</Form.Label>
                        <Form.Control
                          name='tag'
                          as='select'
                          autoComplete='new-password'
                          // placeholder='Please select an option...'
                          defaultValue={''}
                          onChange={handleChange}
                          isInvalid={touched.title && !!errors.title}
                        >
                          <option value='' disabled={true}>
                            Please select an Option
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
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Geolocation
                      values={values}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  </Form.Group>
                  <Button type='submit'>Submit</Button>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
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

export default AddPost;
