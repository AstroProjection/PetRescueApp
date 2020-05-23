import React, { useRef, useEffect, Fragment } from 'react';
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
  index,
  text,
  user: { name, _id: postUser },
  auth,
  uploadImage,
  removePost,
}) => {
  let loggedUser = null;
  // const loading = auth.loading;
  const fileUploadRef = useRef(null);
  // const [fullText, toggleFullText] = useState(false);
  if (auth.user) {
    loggedUser = auth.user._id;
  }

  let formData = new FormData();
  formData.append('image', null);

  // const onClick = useAccordionToggle(index, () => {
  //   toggleFullText(!fullText);
  // });

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

          {/* <Card.Body> */}
          <ReadMoreReact text={text} max={100} min={40} ideal={50} />
          {/* </Card.Body> */}
        </Card.Body>
        <Card.Body>
          <div className='card-post-by'>
            <span className='post-by'>Created By: {name}</span>
          </div>
        </Card.Body>
        {loggedUser === postUser ? (
          <Fragment>
            <div
              className='delete-button'
              onClick={(e) => {
                console.log('removing post');
                removePost(postId);
              }}
            >
              <i className='fas fa-times'></i>
            </div>
          </Fragment>
        ) : (
          ''
        )}
      </Card>
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
