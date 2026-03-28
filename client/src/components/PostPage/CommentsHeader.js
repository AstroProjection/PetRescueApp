import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { addComment } from '../../store/slices/postSlice';
import { connect } from 'react-redux';
import { Box, Button, Textarea, VStack, Heading, FormControl, FormErrorMessage, Text } from '@chakra-ui/react';

const commentValidation = yup.object({
  text: yup.string().required('Cannot submit a blank comment'),
});

const CommentsHeader = ({
  post: { _id: postId },
  addComment,
  isLoggedin,
}) => {
  return isLoggedin ? (
    <Box mb={6} bg="gray.50" p={5} borderRadius="xl" borderWidth="1px" borderColor="gray.200">
      <Heading size="sm" mb={4} color="gray.700">Leave A Comment</Heading>
      <Formik
        initialValues={{ text: '' }}
        validationSchema={commentValidation}
        onSubmit={(values, { resetForm }) => {
          addComment({ formData: values, postId });
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing={3}>
              <FormControl isInvalid={errors.text && touched.text}>
                <Textarea
                  name="text"
                  placeholder="Share a comment or update on this priority..."
                  rows={3}
                  bg="white"
                  focusBorderColor="brand.400"
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.text}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="brand" alignSelf="flex-end" size="sm" isLoading={isSubmitting}>
                Post Comment
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  ) : (
    <Text color="gray.500" fontStyle="italic" mb={6}>Login to add comments...</Text>
  );
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
});

export default connect(mapStateToProps, { addComment })(CommentsHeader);
