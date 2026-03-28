import React from 'react';
import { useSelector, connect } from 'react-redux';
import { addAnimal } from '../../store/slices/animalsSlice';
import AdditionalInfo from './AdditionalInfo';
import PropTypes from 'prop-types';
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
  VStack,
  HStack,
  SimpleGrid,
  Box,
  Divider,
} from '@chakra-ui/react';

export const VaccineContext = React.createContext({});

const animalPostSchema = yup.object({
  image: yup.mixed().notRequired(),
  name: yup.string().required('Please enter a name'),
  type: yup.string().required('Select an option'),
  identity: yup.string().required('Select an option'),
  locality: yup.string().required(),
  location: yup.string().required('Select an option'),
  spayedValue: yup.string().required('Select an option'),
  spayedHospital: yup.string().notRequired(),
  spayedDate: yup.date().notRequired(),
  vaccineArr: yup.array().of(
    yup.object({
      vaccinename: yup.string().required('Enter vaccine name'),
      vaccineDateTaken: yup.string().notRequired(),
      vaccineDateDue: yup.string().notRequired(),
    })
  ),
});

const AddPost = (props) => {
  const {
    addAnimal,
    street,
    locality: { locality },
    isOpen,
    onClose,
  } = props;
  
  let locations = locality ? locality.features : [];
  locations = locations.map((feature) => ({
    displayName: feature.properties.displayName,
    name: feature.properties.name,
  }));
  locations.sort((locationA, locationB) => locationA.name > locationB.name ? 1 : -1);
  
  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = (values) => {
    let formSubmit = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'vaccineArr') formSubmit.append(key, value);
    }
    for (const element of values.vaccineArr) {
      formSubmit.append('vaccineArr[]', JSON.stringify(element));
    }
    addAnimal(formSubmit);
    if (onClose) onClose();
    else if (props.onHide) props.onHide();
  };

  const isModalOpen = isOpen !== undefined ? isOpen : props.show;

  return (
    <Modal isOpen={isModalOpen} onClose={onClose || props.onHide} size="xl" isCentered scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(4px)" bg="blackAlpha.300" />
      <ModalContent borderRadius="2xl" boxShadow="2xl">
        <ModalHeader color="brand.600" borderBottomWidth="1px" borderColor="gray.100">
          <i className="fa fa-paw" style={{ marginRight: '10px' }}></i> Add an Animal Tracker
        </ModalHeader>
        <ModalCloseButton />
        
        {!loading ? (
          <Formik
            validationSchema={animalPostSchema}
            initialValues={{
              image: '',
              name: '',
              type: '',
              identity: '',
              locality: locality ? locality._id : '',
              location: street ? street.streetname : '',
              spayedValue: '',
              spayedHospital: '',
              spayedDate: new Date(),
              vaccineArr: [],
            }}
            onSubmit={onSubmit}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, setValues, touched }) => (
              <form onSubmit={handleSubmit}>
                <ModalBody py={6}>
                  <VStack spacing={6} align="stretch">
                    <FormControl>
                      <FormLabel fontWeight="bold">Add Image</FormLabel>
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

                    <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4}>
                      <FormControl isInvalid={touched.name && !!errors.name} gridColumn={{ md: "span 2" }}>
                        <FormLabel fontWeight="bold">Name *</FormLabel>
                        <Input
                          name="name"
                          type="text"
                          placeholder="Animal name..."
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          focusBorderColor="brand.400"
                        />
                        <FormErrorMessage>{errors.name}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={touched.type && !!errors.type} gridColumn={{ md: "span 1" }}>
                        <FormLabel fontWeight="bold">Type *</FormLabel>
                        <Select
                          name="type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue="default"
                          focusBorderColor="brand.400"
                        >
                          <option value="default" disabled>Select</option>
                          <option value="dog">Dog</option>
                          <option value="cat">Cat</option>
                        </Select>
                        <FormErrorMessage>{errors.type}</FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={touched.identity && !!errors.identity} gridColumn={{ md: "span 2" }}>
                        <FormLabel fontWeight="bold">Identity *</FormLabel>
                        <Select
                          name="identity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue="default"
                          focusBorderColor="brand.400"
                        >
                          <option value="default" disabled>Select status</option>
                          <option value="1">Pet</option>
                          <option value="0">Stray</option>
                        </Select>
                        <FormErrorMessage>{errors.identity}</FormErrorMessage>
                      </FormControl>
                    </SimpleGrid>

                    <Box p={4} bg="brand.50" borderRadius="md" borderWidth="1px" borderColor="brand.100">
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl>
                          <FormLabel fontWeight="bold">Locality</FormLabel>
                          <Input name="locality_fake" value={street?.locality?.locality || ''} disabled bg="white" />
                        </FormControl>
                        <FormControl isInvalid={touched.location && !!errors.location}>
                          <FormLabel fontWeight="bold">Location *</FormLabel>
                          <Input name="location" value={street?.displayName || ''} disabled bg="white" />
                          <FormErrorMessage>{errors.location}</FormErrorMessage>
                        </FormControl>
                      </SimpleGrid>
                    </Box>

                    <Divider />
                    
                    <AdditionalInfo
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      values={values}
                      setValues={setValues}
                    />
                  </VStack>
                </ModalBody>
                
                <ModalFooter bg="gray.50" borderTopWidth="1px" borderColor="gray.100" borderBottomRadius="2xl">
                  <HStack spacing={3}>
                    <Button variant="ghost" onClick={onClose || props.onHide}>
                      Cancel
                    </Button>
                    <Button type="submit" colorScheme="brand">
                      Submit Record
                    </Button>
                  </HStack>
                </ModalFooter>
              </form>
            )}
          </Formik>
        ) : (
          <ModalBody py={10}>
            <Spinner />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

AddPost.propTypes = {
  addAnimal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  street: state.street.street,
  locality: state.locality,
});

export default connect(mapStateToProps, { addAnimal })(React.memo(AddPost));
