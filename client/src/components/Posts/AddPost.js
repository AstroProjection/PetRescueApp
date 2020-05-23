import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile';
import Button from 'react-bootstrap/Button';

import bsCustomFileInput from 'bs-custom-file-input';

import Spinner from '../Layout/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../store/actions/post';

const AddPost = (props) => {
  const [formDataState, setFormData] = React.useState({
    title: '',
    text: '',
    image: '',
  });
  const { title, text, image } = formDataState;

  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  let formData = new FormData();

  const onChange = (e) =>
    setFormData({ ...formDataState, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(new FormData(e.target)));
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
            <Modal.Title
              id='contained-modal-title-vcenter'
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
            >
              Add a Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => onSubmit(e)}>
              <FormFile custom>
                <FormFile.Input
                  name='image'
                  onChange={(e) => {
                    setFormData({
                      ...formDataState,
                      [e.target.name]: e.target.files[0],
                    });
                    bsCustomFileInput.init();
                  }}
                />
                <FormFile.Label>Add image</FormFile.Label>
              </FormFile>
              <Form.Group controlId='addpost-title'>
                <Form.Label>Title*</Form.Label>
                <Form.Control
                  name='title'
                  type='text'
                  placeholder='enter title here...'
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId='addpost-text'>
                <Form.Label>Description*</Form.Label>
                <Form.Control
                  as='textarea'
                  rows='2'
                  name='text'
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>
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

AddPost.propTypes = {};

export default AddPost;
