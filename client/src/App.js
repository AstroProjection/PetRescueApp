import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { loadUser } from './store/actions/auth';
import { mobileCheck } from './store/actions/device';
import UserBadge from './components/Layout/UserBadge';

function App({ loadUser, mobileCheck, loading }) {
  useEffect(() => {
    /// adding this comment
    mobileCheck();
    loadUser();
  }, [loadUser, mobileCheck]);

  return (
    !loading && (
      <Router>
        <Navbar />
        <div className='spacer-div'></div>
        <UserBadge />
        <div className='main-wrapper'>
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/about' component={About} />
            <Route exact path='/' component={Landing} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/animal-tracker' component={MapPage} />
            <Route exact path='/post/:postId' component={PostPage} />
            <Route exact path='/animals/:animalId' component={AnimalPage} />
            <Route
              exact
              path='/edit-animals/:animalId'
              component={AnimalPage}
            />
            {/* <Route exact path='/confirmation/:token' component={About} /> */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { loadUser, mobileCheck })(App);
