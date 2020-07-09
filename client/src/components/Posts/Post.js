import React, { useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ReadMoreReact from 'read-more-react';
import Moment from 'react-moment';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Whatsapp from './Whatsapp';
// import Accordion from 'react-bootstrap/Accordion';
// import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { connect } from 'react-redux';

import { uploadImage, removePost } from '../../store/actions/post';
import EditPost from './EditPost';

const Post = ({
  user: { name, _id: postUser },
  auth,
  uploadImage,
  removePost,
  comments,
  setEditModal,
  editModal,
  post,
  setEditPost,
}) => {
  const { _id, image, title, text, tag, status, createdAt, urgency } = post;
  const date = createdAt;
  const img = image;
  const postId = _id;

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
                    variant='light'
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
          {/* <ReadMoreReact text={text} max={200} min={40} ideal={80} /> */}
          <Card.Body>
            {text.length > 80 ? text.slice(0, 80) + '...' : text}
          </Card.Body>
        </div>
        <div className='post-report'>
          <div className='post-urgency'>
            {urgency === 'high' && (
              <i className='fas fa-exclamation-triangle animate-danger'></i>
            )}
            {urgency === 'mid' && (
              <i className='fas fa-exclamation-triangle animate-medium'></i>
            )}
            {urgency === 'low' && (
              <i className='fas fa-exclamation-triangle animate-low'></i>
            )}
            <p className='tag-animate'>{tag}</p>
          </div>
          <div className='post-status'>Status:{status}</div>
        </div>
        <div className='post-by'>
          <div className='card-post-by'>
            <small>
              <span className='post-by'>
                <i className='fas fa-user'></i> {name}
              </span>
              <span>
                <Moment format='DD/MM/YYYY'>{date}</Moment>
              </span>
            </small>
          </div>
        </div>
        <div className='post-share'>
          <div className='whatsapp'>
            <Whatsapp />
          </div>
        </div>
        <div className='post-discuss'>
          <Link
            to={`/post/${postId}`}
            className='comments-btn'
            onClick={() => {}}
          >
            <i className='far fa-comment-alt'></i> <b>{comments}</b>
          </Link>
        </div>
        <div className='post-modifications'>
          {loggedUser === postUser ? (
            <Fragment>
              <div
                className='button edit-btn'
                onClick={(e) => {
                  // removePost(postId);
                  setEditModal(true);
                  setEditPost({ ...post });
                }}
              >
                <i className='fas fa-edit'></i>
              </div>
              <div
                className='button delete-btn'
                onClick={(e) => {
                  if (window.confirm('Do you really want to delete the post?'))
                    removePost(postId);
                }}
              >
                <i className='fas fa-trash'></i>
              </div>
            </Fragment>
          ) : (
            <>
              <div className='button missing'>*</div>
            </>
          )}
        </div>
        {/* {JSON.stringify(post, null, 2)} */}
      </div>
    </React.Fragment>
  );
};

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadImage, removePost })(Post);
