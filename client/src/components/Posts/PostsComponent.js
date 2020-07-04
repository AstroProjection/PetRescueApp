import React from 'react';
import Posts from './../Posts/Posts';
// import Geolocation from './Geolocation';

const PostsComponent = (props) => {
  return (
    <React.Fragment>
      <section className='container'>
        <Posts />
      </section>
    </React.Fragment>
  );
};

export default PostsComponent;
