import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const AnimalProfileTop = ({ animal }) => {
  return (
    <div className='animalprofile-top bg-main p-2'>
      <img className='round-img my-1' src={animal.image} alt='' />
      <h1 className='large'>{animal.name}</h1>
      <p className='lead'>
        {
          <small>
            A <b>{animal.type}</b> in <b>{animal.locality.locality}</b>
          </small>
        }
      </p>
      <p>
        Location:{' '}
        {animal.location && (
          <span>
            <i className='fas fa-map-marker'></i>{' '}
            {animal.streetInfo.displayName}
          </span>
        )}
      </p>
    </div>
  );
};

AnimalProfileTop.propTypes = {
  animal: PropTypes.object.isRequired,
};

export default AnimalProfileTop;
