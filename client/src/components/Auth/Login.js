import React from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { login } from '../../store/actions/auth';

import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Please enter an email'),
  password: yup.string().required('Please enter a password').max(15),
});

let timeoutVariable;

const Login = ({ login, auth: { isLoggedin } }) => {
  React.useEffect(() => {
    return () => {
      clearInterval(timeoutVariable);
    };
  }, []);

  const onSubmit = (form, { setSubmitting }) => {
    login(form);

    timeoutVariable = setTimeout(() => {
      setSubmitting(false);
    }, 1600);
  };

  if (isLoggedin) return <Redirect to='/home' />;
  return (
    <React.Fragment>
      <Container>
        <h1>Sign In</h1>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{
            email: '',
            password: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            isValid,
            isSubmitting,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    onChange={handleChange}
                    name='email'
                    value={values.email}
                    autoComplete='username'
                    isInvalid={touched.email && errors.email}
                    // isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    onChange={handleChange}
                    name='password'
                    value={values.password}
                    autoComplete='password'
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  className='auth-button-form'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(React.memo(Login));
