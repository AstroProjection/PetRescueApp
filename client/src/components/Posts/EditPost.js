import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';
import { editPost } from '../../store/slices/postSlice';
import Geolocation from './Geolocation';
import Spinner from '../Layout/Spinner';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Textarea,
  Checkbox,
  VStack,
  HStack,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';

const postValidationSchema = yup.object({
  title: yup
    .string()
    .required('Please enter a title')
    .min(5, 'Title must be at least 5 characters')
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

const EditPost = ({ isMobile, editPost, post, isOpen, onClose }) => {
  const initLocationState = {
    center: [],
    zoom: 17,
  };
  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = async (values, { setSubmitting }) => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'locationState') formData.append(key, value);
      else formData.append(key, JSON.stringify(value));
    }
    await editPost(formData, post._id);
    setSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.300" />
      <ModalContent borderRadius="2xl" boxShadow="2xl">
        <ModalHeader color="brand.600" borderBottomWidth="1px" borderColor="gray.100">
          <i className="fa fa-edit" style={{ marginRight: '10px' }}></i> Edit Incident Report
        </ModalHeader>
        <ModalCloseButton />
        
        {!loading && post ? (
          <Formik
            onSubmit={onSubmit}
            enableReinitialize={true}
            initialValues={{
              title: post.title || '',
              text: post.text || '',
              image: post.image || '',
              tag: post.tag || '',
              urgency: post.urgency || '',
              status: post.status || 'open',
              showLocation: !isMobile,
              locationState: post.locationState || initLocationState,
            }}
            validationSchema={postValidationSchema}
          >
            {({ handleSubmit, handleChange, setFieldValue, values, touched, errors, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <ModalBody py={6}>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel fontWeight="bold">Update Image</FormLabel>
                      <Box p={4} borderWidth="2px" borderStyle="dashed" borderRadius="md" borderColor="gray.300" bg="gray.50" textAlign="center" _hover={{ borderColor: 'brand.400' }} transition="all 0.2s">
                        <Input
                          type="file"
                          name="image"
                          accept="image/jpeg,image/png"
                          onChange={(e) => setFieldValue('image', e.currentTarget.files[0])}
                          variant="unstyled"
                          p={1}
                        />
                      </Box>
                    </FormControl>

                    <FormControl isInvalid={touched.title && !!errors.title}>
                      <FormLabel fontWeight="bold">Title *</FormLabel>
                      <Input
                        name="title"
                        type="text"
                        placeholder="e.g., Stray dog seen near park"
                        onChange={handleChange}
                        value={values.title}
                        focusBorderColor="brand.400"
                        size="md"
                      />
                      <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </FormControl>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                      <FormControl isInvalid={touched.tag && !!errors.tag}>
                        <FormLabel fontWeight="bold">Tag *</FormLabel>
                        <Select name="tag" onChange={handleChange} value={values.tag} focusBorderColor="brand.400">
                          <option value="" disabled>Select tag</option>
                          {postTags.map((tag, index) => (
                            <option key={index} value={tag[0]}>{tag[1]}</option>
                          ))}
                        </Select>
                        <FormErrorMessage>{errors.tag}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={touched.urgency && !!errors.urgency}>
                        <FormLabel fontWeight="bold">Urgency *</FormLabel>
                        <Select name="urgency" onChange={handleChange} value={values.urgency} focusBorderColor="brand.400">
                          <option value="" disabled>Select urgency</option>
                          {urgencyTags.map((tag, index) => (
                            <option key={index} value={tag[0]}>{tag[1]}</option>
                          ))}
                        </Select>
                        <FormErrorMessage>{errors.urgency}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={touched.status && !!errors.status}>
                        <FormLabel fontWeight="bold">Status *</FormLabel>
                        <Select name="status" onChange={handleChange} value={values.status} focusBorderColor="brand.400">
                          <option value="" disabled>Select status</option>
                          {statusTags.map((tag, index) => (
                            <option key={index} value={tag[0]}>{tag[1]}</option>
                          ))}
                        </Select>
                        <FormErrorMessage>{errors.status}</FormErrorMessage>
                      </FormControl>
                    </SimpleGrid>

                    <FormControl isInvalid={touched.text && !!errors.text}>
                      <FormLabel fontWeight="bold">Description *</FormLabel>
                      <Textarea
                        rows={3}
                        name="text"
                        placeholder="Provide details..."
                        onChange={handleChange}
                        value={values.text}
                        focusBorderColor="brand.400"
                      />
                      <FormErrorMessage>{errors.text}</FormErrorMessage>
                    </FormControl>

                    {!isMobile && (
                      <FormControl>
                        <Checkbox
                          name="showLocation"
                          isChecked={values.showLocation}
                          onChange={(e) => {
                            if (e.target.checked && !values.locationState.center.length) {
                              setFieldValue('locationState', initLocationState);
                            }
                            handleChange(e);
                          }}
                          colorScheme="brand"
                          fontWeight="bold"
                        >
                          Modify Location Map Tracker
                        </Checkbox>
                      </FormControl>
                    )}

                    {values.showLocation && (
                      <Box mt={2} borderRadius="xl" overflow="hidden" borderWidth="1px" borderColor="gray.200">
                        {/* Wrapper for Geolocation to ensure it renders securely */}
                        <Geolocation
                          values={values}
                          handleChange={handleChange}
                          setFieldValue={setFieldValue}
                        />
                      </Box>
                    )}
                  </VStack>
                </ModalBody>

                <ModalFooter bg="gray.50" borderTopWidth="1px" borderColor="gray.100" borderBottomRadius="2xl">
                  <HStack spacing={3}>
                    <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      colorScheme="brand"
                      isLoading={isSubmitting}
                      loadingText="Updating..."
                    >
                      Update Incident
                    </Button>
                  </HStack>
                </ModalFooter>
              </form>
            )}
          </Formik>
        ) : (
          <ModalBody py={10} textAlign="center">
            {loading ? <Spinner /> : <p>No post selected.</p>}
          </ModalBody>
        )}
      </ModalContent>
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
