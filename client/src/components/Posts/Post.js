import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';

const Post = ({
  img,
  title,
  text,
  user: { name, _id: postUser },
  auth: {
    user: { _id: loggedUser },
    loading,
  },
}) => {
  return (
    <React.Fragment>
      <Card className='card-post-layout'>
        {img ? <Card.Img variant='top' src={img} /> : ''}
        {loggedUser === postUser ? (
          <React.Fragment>
            <Button variant='info'>
              <i class='fas fa-plus-circle medium'></i>Add
              <br />
              Image
            </Button>
          </React.Fragment>
        ) : (
          <Button variant='secondary' disabled>
            No image
          </Button>
        )}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
        <div className='card-post-by'>
          <span className='post-by'>Created By: {name}</span>
        </div>
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

export default connect(mapStateToProps, null)(Post);
