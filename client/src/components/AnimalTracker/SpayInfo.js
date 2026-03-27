import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';

const SpayInfo = ({ handleChange, handleBlur }) => {
  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <SimpleGrid columns={{ base: 1, md: showInfo ? 3 : 1 }} spacing={4}>
      <FormControl>
        <FormLabel fontWeight="bold">Neutered?</FormLabel>
        <Select
          name='spayedValue'
          defaultValue='default'
          onChange={(e) => {
            handleChange(e);
            parseInt(e.currentTarget.value) === 1
              ? setShowInfo(true)
              : setShowInfo(false);
          }}
          focusBorderColor="brand.400"
        >
          <option value='default' disabled>Select an option</option>
          <option value='2'>Don't know</option>
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
      </FormControl>

      {showInfo && (
        <>
          <FormControl>
            <FormLabel fontWeight="bold">Which vet?</FormLabel>
            <Input
              placeholder='Optional clinic name'
              name='spayedHospital'
              onChange={handleChange}
              onBlur={handleBlur}
              focusBorderColor="brand.400"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="bold">Date:</FormLabel>
            <Input
              type="date"
              name='spayedDate'
              onChange={handleChange}
              onBlur={handleBlur}
              focusBorderColor="brand.400"
            />
          </FormControl>
        </>
      )}
    </SimpleGrid>
  );
};

export default SpayInfo;
