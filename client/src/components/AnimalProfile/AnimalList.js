import React from 'react';
import AnimalProfile from './AnimalProfile';
import PropTypes from 'prop-types';
import PageDisplay from './PageDisplay';
import { connect } from 'react-redux';

import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';

const AnimalList = (props) => {
  const {
    index,
    animal,
    faClass,
    street: { street },
  } = props;

  const [pageNumber, setPageNumber] = React.useState(1);
  const profilePerPage = 5;

  const noOfPages =
    street && street[animal] && street[animal].length > 0
      ? Math.ceil(street[animal].length / profilePerPage)
      : 1;

  const updatePage = (newPage) => {
    if (newPage > 0 && newPage <= noOfPages) setPageNumber(newPage);
  };

  const animalList = () => {
    let profileCount = profilePerPage;
    const startingIndex = (pageNumber - 1) * profilePerPage;
    return street && street[animal] && street[animal].length > 0
      ? street[animal].map((anim, idx) => {
          if (idx >= startingIndex && profileCount-- > 0) {
            return (
              <AnimalProfile
                key={anim._id}
                name={anim.name}
                location={anim.location}
                animal={anim}
                profile_index={anim._id}
              />
            );
          } else {
            return null;
          }
        })
      : <Text p={4} color="gray.500">None</Text>;
  };

  return (
    <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="md" mb={2}>
      <AccordionButton _expanded={{ bg: 'brand.50', color: 'brand.600' }} borderRadius="md" p={4}>
        <Flex flex="1" justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="lg" textTransform="capitalize">
            {animal} ({street && street[animal] ? street[animal].length : 0})
          </Text>
          <Box as="i" className={faClass} fontSize="xl" />
        </Flex>
      </AccordionButton>
      <AccordionPanel pb={4} bg="gray.50">
        <PageDisplay
          pageNumber={pageNumber}
          updatePage={updatePage}
          totalPages={noOfPages}
        />
        <Box mt={4}>
          {animalList()}
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

AnimalList.propTypes = {
  street: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  street: state.street,
});

export default connect(mapStateToProps)(React.memo(AnimalList));
