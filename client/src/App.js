import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store/store';
import Navbar from './components/Layout/Navbar';
import PostsComponent from './components/Posts/PostsComponent';
import About from './components/About';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Landing from './components/Landing/Landing';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/about' component={About} />
          <Route exact path='/posts' component={PostsComponent} />
          <Route exact path='/' component={Landing} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
