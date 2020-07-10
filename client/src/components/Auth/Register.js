import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import { register } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
const schema = yup.object({
  name: yup.string().required('Please enter a name'),
  email: yup.string().required('Please enter an email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be atleast 6 characters')
    .max(15, 'Password must be less than 15 characters'),
  locality: yup.string().required('Please select a locality'),
});
const Register = ({ isLoggedin }) => {
  const dispatch = useDispatch();

  const onSubmit = (data, { setSubmitting }) => {
    dispatch(register(data));
  };
  return (
    <React.Fragment>
      <Container>
        <h1>Register</h1>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{
            name: '',
            email: '',
            password: '',
            locality: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            isSubmitting,
            setSubmitting,
          }) => {
            if (isLoggedin) return <Redirect to='/home' />;

            return (
              <Form noValidate={true} onSubmit={handleSubmit}>
                <Form.Group>
                  <Row>
                    <Col lg={6}>
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter your name..'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && errors.name}
                        isValid={touched.name && !errors.name}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.name}
                      </Form.Control.Feedback>
                      <Form.Text className='text-muted'>
                        This will be displayed on posts etc.
                      </Form.Text>
                    </Col>
                    <Col lg={6}>
                      <Form.Label>Locality:</Form.Label>
                      <Form.Control
                        as='select'
                        placeholder='select a locality'
                        name='locality'
                        value={values.locality}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.locality && errors.locality}
                        isValid={touched.locality && !errors.locality}
                      >
                        <option value='' disabled={true}>
                          Please pick a locality..
                        </option>
                        <option value='victoria-layout'>Victoria Layout</option>
                        <option value='ulsoor-1'>Ulsoor</option>
                      </Form.Control>
                      <Form.Control.Feedback type='invalid'>
                        {errors.locality}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && errors.password}
                  isValid={touched.password && !errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>

                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='auth-button-form'
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

Register.propTypes = {
  isLoggedin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
});

export default connect(mapStateToProps)(React.memo(Register));
