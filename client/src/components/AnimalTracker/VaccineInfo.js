import React from 'react';
import VaccineItem from './VaccineItem';
import { Formik, FieldArray, Field } from 'formik';
import { Box, Button, VStack, Heading, Flex, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const VaccineInfo = ({ values, handleChange, handleBlur, setFieldValue, setValues }) => {
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="sm" fontWeight="bold">Vaccination Records</Heading>
      </Flex>
      
      <FieldArray name="vaccineArr">
        {({ insert, remove, push }) => (
          <VStack spacing={4} align="stretch">
            {values.vaccineArr.length > 0 &&
              values.vaccineArr.map((vaccine, index) => (
                <VaccineItem
                  key={index}
                  vaccine={vaccine}
                  index={index}
                  values={values}
                  remove={remove}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  setValues={setValues}
                />
              ))}

            <Button
              colorScheme="brand"
              variant="outline"
              size="sm"
              leftIcon={<AddIcon />}
              onClick={() =>
                push({ vaccinename: '', vaccineDateTaken: '', vaccineDateDue: '' })
              }
              alignSelf="flex-start"
            >
              Add Vaccine Record
            </Button>
          </VStack>
        )}
      </FieldArray>
    </Box>
  );
};

export default VaccineInfo;
