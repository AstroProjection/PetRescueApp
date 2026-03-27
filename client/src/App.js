import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Alert from './components/Layout/Alert';
import About from './components/Info/About';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './components/Info/NotFound';
/// profile pages
import PostPage from './components/PostPage/PostPage';
import AnimalPage from './components/AnimalPage/AnimalProfilePage';

import MapPage from './components/Map/MapPage';

// import PrivateRoute from './utils/PrivateRoute';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import './App.css';

import { connect } from 'react-redux';
import { loadUser } from './store/slices/authSlice';
import { mobileCheck } from './store/slices/deviceSlice';
import UserBadge from './components/Layout/UserBadge';
import supabase from './utils/supabase';
import { Box } from '@chakra-ui/react';

function App({ loadUser, mobileCheck, loading }) {
  useEffect(() => {
    mobileCheck();
    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          loadUser();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUser, mobileCheck]);
// Above code loads the user
  return (
    !loading && (
      <Router>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Navbar />
          <UserBadge />
          <Box flex="1" as="main" p={4} maxW="container.xl" mx="auto" w="full">
            <Alert />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/about' element={<About />} />
              <Route path='/' element={<Landing />} />
              <Route path='/home' element={<Home />} />
              <Route path='/animal-tracker' element={<MapPage />} />
              <Route path='/post/:postId' element={<PostPage />} />
              <Route path='/animals/:animalId' element={<AnimalPage />} />
              <Route path='/edit-animals/:animalId' element={<AnimalPage />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    )
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loadUser, mobileCheck })(App);
