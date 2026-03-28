import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { register } from '../../store/slices/authSlice';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Heading,
  Text,
  Container,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';

const schema = yup.object({
  name: yup.string().required('Please enter a name'),
  email: yup.string().email('Invalid email address').required('Please enter an email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be atleast 6 characters')
    .max(15, 'Password must be less than 15 characters'),
  locality: yup.string().required('Please select a locality'),
});

const Register = ({ isLoggedin, loading }) => {
  const dispatch = useDispatch();

  const onSubmit = async (data, { setSubmitting }) => {
    await dispatch(register(data));
    setSubmitting(false);
  };

  if (isLoggedin) return <Navigate to='/home' replace />;

  return (
    <Container maxW="lg" py={12}>
      <Box p={8} bg="white" boxShadow="xl" borderRadius="2xl" borderWidth="1px" borderColor="gray.100">
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" color="brand.600" size="lg">Register</Heading>
          
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
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={5}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
                    <FormControl isInvalid={touched.name && errors.name}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        focusBorderColor="brand.400"
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                      {!errors.name && <FormHelperText fontSize="xs">Visible on posts.</FormHelperText>}
                    </FormControl>

                    <FormControl isInvalid={touched.locality && errors.locality}>
                      <FormLabel>Locality</FormLabel>
                      <Select
                        placeholder="Pick a locality"
                        name="locality"
                        value={values.locality}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        focusBorderColor="brand.400"
                      >
                        <option value="victoria-layout">Victoria Layout</option>
                        <option value="ulsoor-1">Ulsoor</option>
                      </Select>
                      <FormErrorMessage>{errors.locality}</FormErrorMessage>
                    </FormControl>
                  </SimpleGrid>

                  <FormControl isInvalid={touched.email && errors.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                    {!errors.email && <FormHelperText fontSize="xs">We'll never share your email.</FormHelperText>}
                  </FormControl>

                  <FormControl isInvalid={touched.password && errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      focusBorderColor="brand.400"
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
                    loadingText="Registering..."
                  >
                    Submit
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </VStack>
      </Box>
    </Container>
  );
};

Register.propTypes = {
  isLoggedin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(React.memo(Register));
