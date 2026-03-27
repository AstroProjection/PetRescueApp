import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Please enter an email'),
  password: yup.string().required('Please enter a password').min(6, 'Password is too short').max(15),
});

const Login = ({ login, isLoggedin, loading }) => {
  const onSubmit = async (form, { setSubmitting }) => {
    await login(form);
    setSubmitting(false);
  };

  if (isLoggedin) return <Navigate to='/home' replace />;

  return (
    <Container maxW="md" py={12}>
      <Box 
        p={8} 
        bg="white" 
        boxShadow="xl" 
        borderRadius="2xl" 
        borderWidth="1px" 
        borderColor="gray.100"
      >
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" color="brand.600" size="lg">Sign In</Heading>
          
          <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{ email: '', password: '' }}
          >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={5}>
                  <FormControl isInvalid={touched.email && errors.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      autoComplete="username"
                      focusBorderColor="brand.400"
                      size="lg"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={touched.password && errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      focusBorderColor="brand.400"
                      size="lg"
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    mt={4}
                    isLoading={isSubmitting || loading}
                    loadingText="Logging in..."
                  >
                    Login
                  </Button>
                  <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
                    We'll never share your credentials with anyone else.
                  </Text>
                </VStack>
              </form>
            )}
          </Formik>
        </VStack>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(React.memo(Login));
