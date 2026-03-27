import React from 'react';
import AnimalList from '../../AnimalProfile/AnimalList';
import { connect } from 'react-redux';
import { Accordion, Box, Text, Flex } from '@chakra-ui/react';

const MapInfoListing = ({
  locality,
  faClass,
  index,
  street,
  animal,
  heading,
  faSize,
}) => {
  return (
    <Box mb={4}>
      <Flex align="center" mb={2} px={1}>
        <Box as="i" className={`${faClass} ${faSize}`} mr={2} color="brand.600" />
        <Text fontWeight="bold" mr={2} color="gray.700">
          {street && street[animal] ? street[animal].length : '0'} {heading}
        </Text>
      </Flex>
      
      <Accordion allowMultiple>
        <AnimalList index={index} animal={animal} faClass={faClass} />
      </Accordion>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  locality: state.locality,
});

export default connect(mapStateToProps)(MapInfoListing);
