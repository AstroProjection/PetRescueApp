import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Layout/Spinner';
import AnimalProfileTop from './AnimalProfileTop';
import AnimalProfileAbout from './AnimalProfileAbout';
import AnimalProfileMedical from './AnimalProfileMedical';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAnimalProfile } from '../../store/actions/animal';

const AnimalProfilePage = ({ match, getAnimalProfile, loading, animal }) => {
  const animalId = match.params.animalId;

  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    getAnimalProfile(animalId);
  }, [animalId, getAnimalProfile]);
  return loading ? (
    <Spinner />
  ) : animal ? (
    <React.Fragment>
      <div className='profile-navigation'>
        <Link to='/home' className='button profile-buttons bg-sandybrown'>
          Back to Home page
        </Link>
        <div className='button profile-buttons bg-sandybrown'>Edit Profile</div>
      </div>
      <div className='animalpage-profile bg-main'>
        <AnimalProfileTop animal={animal} />
        <AnimalProfileAbout animal={animal} />
        <AnimalProfileMedical animal={animal} />
      </div>
    </React.Fragment>
  ) : (
    'no profile'
  );
};

AnimalProfilePage.propTypes = {
  //   animalId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.animals.loading,
  animal: state.animals.animal,
});

export default connect(mapStateToProps, { getAnimalProfile })(
  AnimalProfilePage
);
