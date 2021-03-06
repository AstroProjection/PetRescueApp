import React from 'react';
import AnimalPost from './AnimalPost';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AnimalButtons = ({ isLoggedin }) => {
  const [postModal, setPostModal] = React.useState(false);
  return isLoggedin ? (
    <React.Fragment>
      <h1 className='large button-holder'>
        <div
          className='btn btn-success add-post'
          onClick={(e) => setPostModal(true)}
        >
          <i className='fas fa-plus'></i> Add an Animal
        </div>
      </h1>

      <AnimalPost show={postModal} onHide={() => setPostModal(false)} />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <h5>Login to add animals..</h5>
    </React.Fragment>
  );
};

AnimalButtons.propTypes = {
  isLoggedin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
});

export default connect(mapStateToProps)(React.memo(AnimalButtons));
