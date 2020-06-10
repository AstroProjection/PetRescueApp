import React from 'react';
import { connect } from 'react-redux';

const AnimalProfile = (props) => {
  const {
    name,
    // location,
    animal,
    street: { street },
  } = props;

  console.log(animal);
  return (
    <div className='animal-map-profile'>
      <div className='profile-name'>
        <em>Name</em>: <strong>{name}</strong>
      </div>
      <div className='profile-type'>
        <em>Type</em>: <strong>{animal.type}</strong>
      </div>

      <div className='profile-image'>
        {animal && animal.image ? (
          <>
            <img className={`profile-img`} src={`${animal.image}`} />
          </>
        ) : (
          <>No Image'</>
        )}
      </div>
      <div className='profile-information'>
        <em>location</em>: <strong>{street.displayName}</strong>
      </div>
      <div className='profile-btn btn-success profile-button'>
        See full profile
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  street: state.street,
});

export default connect(mapStateToProps)(AnimalProfile);
