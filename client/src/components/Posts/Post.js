import React, { useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ReadMoreReact from 'read-more-react';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
// import Accordion from 'react-bootstrap/Accordion';
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { connect } from 'react-redux';

import { uploadImage, removePost } from '../../store/actions/post';

const Post = ({
  postId,
  img,
  title,
  text,
  user: { name, _id: postUser },
  auth,
  uploadImage,
  removePost,
}) => {
  let loggedUser = null;
  // const loading = auth.loading;
  const fileUploadRef = useRef(null);
  if (auth.user) {
    loggedUser = auth.user._id;
  }

  let formData = new FormData();
  formData.append('image', null);

  return (
    <React.Fragment>
      <div className='card-post-layout'>
        <div className='post-image'>
          {img ? (
            <Image thumbnail='true' src={img} key={img.uri} />
          ) : (
            <React.Fragment>
              {loggedUser === postUser && !auth.loading ? (
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
                    className='stretch'
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
        <div className='post-information'>
          <Card.Title>{title}</Card.Title>
          <ReadMoreReact text={text} max={200} min={40} ideal={80} />
        </div>
        <div className='post-by'>
          <div className='card-post-by'>
            <small>
              <span className='post-by'>Created By: {name}</span>
            </small>
          </div>
        </div>
        <div className='post-modifications'>
          {loggedUser === postUser ? (
            <Fragment>
              <div
                className='button edit-btn'
                onClick={(e) => {
                  // removePost(postId);
                }}
              >
                Edit
              </div>
              <div
                className='button delete-btn'
                onClick={(e) => {
                  if (window.confirm('Do you really want to delete the post?'))
                    removePost(postId);
                }}
              >
                Delete
              </div>
            </Fragment>
          ) : (
            <>
              <div className='button missing'>*</div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  img: PropTypes.string,
  uploadImage: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadImage, removePost })(Post);
