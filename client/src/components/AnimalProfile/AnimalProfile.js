import React from 'react';
import { connect } from 'react-redux';
import AnimalFullProfile from './AnimalFullProfile/AnimalFullProfile';
import { deleteAnimal } from '../../store/slices/animalsSlice';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,
  Text,
  Badge,
  HStack,
  VStack,
  IconButton,
  Flex,
} from '@chakra-ui/react';

export const AnimalContext = React.createContext({});

const AnimalProfile = (props) => {
  const {
    name,
    animal,
    street: { street },
    profile_index,
    auth: { user },
    deleteAnimal,
  } = props;

  const identity = ['Stray', 'Pet'];

  const removeAnimal = (animalId) => {
    if (window.confirm('Are you sure you want to remove this profile?')) {
      deleteAnimal(animalId, street._id);
    }
  };

  return (
    <Accordion allowToggle mb={4} bg="white" borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor="gray.100">
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <AccordionButton p={4} borderRadius="lg" _hover={{ bg: "gray.50" }}>
              <Flex w="full" align="center" justify="space-between">
                <HStack spacing={4}>
                  <Box w="60px" h="60px" borderRadius="full" overflow="hidden" bg="gray.100">
                    {animal && animal.image ? (
                      <Image src={animal.image} alt={name} objectFit="cover" w="full" h="full" />
                    ) : (
                      <Flex align="center" justify="center" h="full" w="full" bg="gray.200">
                        <i className="fas fa-paw" style={{ color: '#A0AEC0' }}></i>
                      </Flex>
                    )}
                  </Box>
                  <VStack align="start" spacing={1}>
                    <HStack>
                      <Text fontWeight="bold" fontSize="lg">{name}</Text>
                      {animal.hasOwnProperty('identity') && (
                        <Badge colorScheme={animal.identity === 0 ? "orange" : "green"}>
                          {identity[animal.identity]}
                        </Badge>
                      )}
                    </HStack>
                    <Text fontSize="sm" color="gray.500">
                      <i className="fas fa-map-marker-alt"></i> {street.displayName}
                    </Text>
                  </VStack>
                </HStack>

                <HStack spacing={3}>
                  <VStack align="end" spacing={1} display={{ base: 'none', md: 'flex' }}>
                    <Badge colorScheme="purple">{animal.type}</Badge>
                  </VStack>
                  {user && user._id === animal.user && (
                    <IconButton
                      size="sm"
                      icon={<i className="fa fa-trash"></i>}
                      variant="ghost"
                      colorScheme="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAnimal(profile_index);
                      }}
                      aria-label="Delete Animal"
                    />
                  )}
                  <AccordionIcon />
                </HStack>
              </Flex>
            </AccordionButton>
            
            <AccordionPanel pb={4} pt={0} px={4}>
              <Box borderTopWidth="1px" borderColor="gray.100" pt={4} mt={2}>
                <AnimalContext.Provider value={{ animal }}>
                  <AnimalFullProfile />
                </AnimalContext.Provider>
              </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

const mapStateToProps = (state) => ({
  street: state.street,
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAnimal })(AnimalProfile);
