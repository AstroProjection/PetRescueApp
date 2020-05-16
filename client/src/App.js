import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store/store';
import Navbar from './components/Layout/Navbar';
import PostButtons from './components/Buttons/PostButtons';
import Posts from './components/Posts/Posts';
import './App.css';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <PostButtons />
        <Posts />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
