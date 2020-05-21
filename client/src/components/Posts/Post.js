import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { connect } from 'react-redux';

import { uploadImage } from '../../store/actions/post';

const Post = ({
  postId,
  img,
  title,
  text,
  user: { name, _id: postUser },
  auth,
  uploadImage,
}) => {
  let loggedUser = null;
  const loading = auth.loading;
  const fileUploadRef = useRef(null);

  if (auth.user) {
    loggedUser = auth.user._id;
  }

  let formData = new FormData();
  formData.append('image', null);

  useEffect(() => {}, [img]);
  return (
    <React.Fragment>
      <Card className='card-post-layout'>
        <div className='post-image'>
          {img ? (
            <Image thumbnail='true' src={img} key={img.uri} />
          ) : (
            <React.Fragment>
              {loggedUser === postUser ? (
                <React.Fragment>
                  <input
                    type='file'
                    className='upload-input'
                    ref={fileUploadRef}
                    accept='image/png, image/jpeg'
                    onChange={(e) => {
                      formData.set('image', e.target.files[0]);
                      uploadImage(formData, postId);
                    }}
                  ></input>
                  <Button
                    variant='info'
                    onClick={(e) => fileUploadRef.current.click()}
                  >
                    <i className='fas fa-plus-circle medium'></i>Add Image
                  </Button>
                  <br />
                </React.Fragment>
              ) : (
                <div className='post-image-disabled'>
                  <span>No image</span>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{`${text.slice(0, 20)}...`}</Card.Text>
          <Card.Link href='#!'>Read full post...</Card.Link>
        </Card.Body>
        {/* <Card.Body> */}
        <div className='card-post-by'>
          <span className='post-by'>Created By: {name}</span>
        </div>
        {/* </Card.Body> */}
      </Card>
    </React.Fragment>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  img: PropTypes.string,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadImage })(Post);
