import React from 'react';
import PropTypes from 'prop-types';
import MapComponent from './MapComponent';
import { setLocality } from '../../store/slices/localitySlice';
import { connect } from 'react-redux';
import { Box, Heading, Select, Text, VStack } from '@chakra-ui/react';

const MapPage = ({ setLocality, locality: { locality, loading } }) => {
  return (
    <Box maxW="container.xl" mx="auto" py={6}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center" mb={2}>
          <Heading color="brand.600" size="xl">
            {locality ? locality.locality : 'Select a locality'}
          </Heading>
        </Box>

        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" borderWidth="1px" borderColor="gray.100">
          <VStack spacing={4} align="stretch" maxW="md" mx="auto">
            <Select
              placeholder="Select an option"
              defaultValue={''}
              onChange={(e) => setLocality(e.target.value)}
              focusBorderColor="brand.400"
              size="lg"
              bg="gray.50"
            >
              <option value='victoria-layout'>Victoria Layout</option>
              <option value='ulsoor-1'>Ulsoor</option>
            </Select>

            <Text textAlign="center" color="gray.600">
              <strong>Click</strong> on the <strong>road</strong> to know about the animals there...
            </Text>
          </VStack>
        </Box>

        <Box borderRadius="xl" overflow="hidden" boxShadow="md" borderWidth="1px" borderColor="gray.200" minH="500px">
          {!!locality && !loading && <MapComponent />}
        </Box>
      </VStack>
    </Box>
  );
};

MapPage.propTypes = {
  setLocality: PropTypes.func.isRequired,
  locality: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  locality: state.locality,
});

export default connect(mapStateToProps, { setLocality })(React.memo(MapPage));
