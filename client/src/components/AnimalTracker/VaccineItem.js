import React from 'react';
import DatePicker from 'react-datepicker';
import { Input, IconButton, HStack, Box } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const VaccineItem = (props) => {
  const { setFieldValue, index, values, remove } = props;
  
  return (
    <HStack spacing={3} p={3} bg="white" borderWidth="1px" borderColor="gray.100" borderRadius="md" alignItems="center" shadow="sm">
      <Box flex="1">
        <Input
          placeholder='Vaccine name...'
          autoComplete='new-password'
          name={`values.vaccineArr.${index}.vaccinename`}
          value={values.vaccineArr[`${index}`].vaccinename}
          onChange={(e) =>
            setFieldValue(`vaccineArr.${index}.vaccinename`, e.target.value)
          }
          focusBorderColor="brand.400"
          size="sm"
        />
      </Box>
      <Box flex="1">
        <Box as={DatePicker}
          selected={values.vaccineArr[`${index}`].vaccineDateTaken}
          dateFormat='MMMM dd yyyy'
          autoComplete='new-password'
          name={`values.vaccineArr.${index}.vaccineDateTaken`}
          placeholderText={'Date Taken'}
          onChange={(date) =>
            setFieldValue(`vaccineArr.${index}.vaccineDateTaken`, date)
          }
          customInput={<Input size="sm" focusBorderColor="brand.400" />}
        />
      </Box>
      <Box flex="1">
        <Box as={DatePicker}
          selected={values.vaccineArr[`${index}`].vaccineDateDue}
          dateFormat='MMMM dd yyyy'
          autoComplete='new-password'
          name={`values.vaccineArr.${index}.vaccineDateDue`}
          placeholderText={'Date Due'}
          onChange={(date) =>
            setFieldValue(`vaccineArr.${index}.vaccineDateDue`, date)
          }
          customInput={<Input size="sm" focusBorderColor="brand.400" />}
        />
      </Box>
      <IconButton
        icon={<DeleteIcon />}
        colorScheme="red"
        variant="ghost"
        size="sm"
        onClick={() => remove(index)}
        aria-label="Remove vaccine"
      />
    </HStack>
  );
};

export default VaccineItem;
