import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormFile from 'react-bootstrap/FormFile';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import bsCustomFileInput from 'bs-custom-file-input';

import Spinner from '../Layout/Spinner';

import { useSelector } from 'react-redux';
import { addAnimal } from '../../store/actions/animal';
import mapData from '../../resources/victoria-layout.json';

const AddPost = (props) => {
  let locations = mapData.features;
  locations = locations.map((feature) => feature.properties.displayName);
  locations = locations.filter(
    (location, index) => locations.indexOf(location) === index
  );

  locations.sort();
  const [formDataState, setFormData] = React.useState({
    image: '',
    name: '',
    location: '',
    type: '',
  });
  // const { name, location, image, type } = formDataState;

  const loading = useSelector((state) => state.auth.loading);
  // const dispatch = useDispatch();
  let formData = new FormData();

  const onChange = (e) =>
    setFormData({ ...formDataState, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addAnimal(new FormData(e.target));
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
              //   name='title'
              //   value={'YELLOW'}
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
                <Form.Label>Name*</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  placeholder='enter the animals name...'
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group controlId='addpost-text'>
                <Row>
                  <Col md={9}>
                    <Form.Label>location*</Form.Label>
                    <Form.Control
                      as='select'
                      name='location'
                      onChange={(e) => onChange(e)}
                    >
                      {locations.length > 0 ? (
                        <React.Fragment>
                          {locations.map((streetName, index) => {
                            return <option key={index}>{streetName}</option>;
                          })}
                        </React.Fragment>
                      ) : (
                        ''
                      )}
                    </Form.Control>
                  </Col>
                  <Col md={3}>
                    <Form.Label>Type*</Form.Label>
                    <Form.Control
                      as='select'
                      name='type'
                      onChange={(e) => onChange(e)}
                    >
                      <option value='dog'>dog</option>
                      <option value='cat'>cat</option>
                    </Form.Control>
                  </Col>
                </Row>
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

AddPost.propTypes = {
  addAnimal: PropTypes.func.isRequired,
};

export default connect(null, { addAnimal })(React.memo(AddPost));
