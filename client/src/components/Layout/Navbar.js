import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import {
  Box,
  Flex,
  HStack,
  Button,
  useDisclosure,
  IconButton,
  Stack,
  Text,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const NavbarComponent = ({ logout, isLoggedin, user, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Links = [
    { name: 'Home', path: '/home' },
    { name: 'Animal Tracker', path: '/animal-tracker' },
    { name: 'About', path: '/about' },
  ];

  const NavLink = ({ children, path }) => (
    <Button
      as={RouterLink}
      to={path}
      variant="ghost"
      colorScheme="brand"
      onClick={onClose}
    >
      {children}
    </Button>
  );

  return (
    !loading && (
      <Box 
        bg="rgba(255, 255, 255, 0.8)" 
        backdropFilter="blur(10px)" 
        px={4} 
        position="sticky" 
        top={0} 
        zIndex={1000} 
        boxShadow="sm"
        w="full"
      >
        <Flex h={16} alignItems="center" justify="space-between" maxW="container.xl" mx="auto">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems="center">
            <Box as={RouterLink} to="/home" fontWeight="bold" fontSize="xl" color="brand.600" display="flex" alignItems="center">
              <i className="fas fa-paw" style={{ marginRight: '8px' }}></i>Pet RescYou
            </Box>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.name} path={link.path}>{link.name}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
            {isLoggedin ? (
              <HStack spacing={4}>
                <Text fontWeight="medium" color="gray.600">Welcome {user?.name}!</Text>
                <Button onClick={logout} colorScheme="red" variant="outline" size="sm">
                  <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i> Logout
                </Button>
              </HStack>
            ) : (
              <HStack spacing={4}>
                <Button as={RouterLink} to="/login" variant="ghost" colorScheme="brand" size="sm">
                  <i className="fas fa-sign-in-alt" style={{ marginRight: '5px' }}></i> Sign-In
                </Button>
                <Button as={RouterLink} to="/register" colorScheme="brand" size="sm">
                  <i className="fas fa-user-plus" style={{ marginRight: '5px' }}></i> Sign-Up
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>

        {/* Mobile Nav */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} path={link.path}>{link.name}</NavLink>
              ))}
              <Divider />
              {isLoggedin ? (
                <Stack spacing={2}>
                  <Text textAlign="center" fontWeight="medium" color="gray.600">Welcome {user?.name}!</Text>
                  <Button onClick={() => { logout(); onClose(); }} colorScheme="red" variant="outline" w="full">
                    Logout
                  </Button>
                </Stack>
              ) : (
                <Stack spacing={2} align="stretch">
                  <Button as={RouterLink} to="/login" variant="outline" colorScheme="brand" w="full" onClick={onClose}>
                    Sign-In
                  </Button>
                  <Button as={RouterLink} to="/register" colorScheme="brand" w="full" onClick={onClose}>
                    Sign-Up
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    )
  );
};

NavbarComponent.propTypes = {
  logout: PropTypes.func.isRequired,
  isLoggedin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout })(React.memo(NavbarComponent));
