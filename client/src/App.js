import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Alert from './components/Layout/Alert';
import About from './components/Info/About';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './components/Info/NotFound';

import MapPage from './components/Map/MapPage';

// import PrivateRoute from './utils/PrivateRoute';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { loadUser } from './store/actions/auth';
import UserBadge from './components/Layout/UserBadge';
// import setAuthToken from './utils/setAuthToken';

function App({ loadUser }) {
  useEffect(() => {
    // console.log('app calling loaduser');
    // if (localStorage.token) loadUser();
  }, [loadUser]);
  return (
    <BrowserRouter>
      <Navbar />
      <div className='spacer-div'></div>
      <UserBadge />
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/about' component={About} />
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/animal-tracker' component={MapPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect(null, { loadUser })(App);
