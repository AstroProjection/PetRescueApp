import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const AnimalProfileAbout = ({ animal }) => {
  return (
    <Fragment>
      <div className='animalprofile-about bg-submain p-2'>
        {true && (
          <Fragment>
            <h2>About {animal.name}</h2>
            {animal.profile ? (
              animal.profile.bio ? (
                'Add in bio'
              ) : (
                'this is empty...'
              )
            ) : (
              <div>Create profile</div>
            )}
            <div className='line'></div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

AnimalProfileAbout.propTypes = {
  animal: PropTypes.object.isRequired,
};

export default AnimalProfileAbout;
