import React from 'react';
import AnimalPost from './AnimalPost';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AnimalButtons = ({ isLoggedin }) => {
  const [postModal, setPostModal] = React.useState(false);
  return isLoggedin ? (
    <React.Fragment>
      <h1 className='large button-holder'>
        <button
          className='btn btn-success add-post'
          onClick={(e) => setPostModal(true)}
        >
          Add an Animal
        </button>
      </h1>

      <AnimalPost show={postModal} onHide={() => setPostModal(false)} />
    </React.Fragment>
  ) : (
    ''
  );
};

AnimalButtons.propTypes = {
  isLoggedin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
});

export default connect(mapStateToProps, null)(React.memo(AnimalButtons));
