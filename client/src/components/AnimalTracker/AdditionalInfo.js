import React from 'react';
import VaccineInfo from './VaccineInfo';
import SpayInfo from './SpayInfo';
import { Box, Heading, Divider, VStack } from '@chakra-ui/react';

const AdditionalInfo = ({
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  setValues,
}) => {
  return (
    <Box mt={6}>
      <Heading size="md" mb={4} color="gray.700">
        <em>Additional Info</em>
      </Heading>
      <Divider mb={4} />
      <VStack spacing={6} align="stretch">
        <SpayInfo
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          values={values}
        />
        <Divider />
        <VaccineInfo
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          values={values}
          setValues={setValues}
        />
      </VStack>
    </Box>
  );
};

export default AdditionalInfo;
