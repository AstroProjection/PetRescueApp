import React from 'react';

import { Link } from 'react-router-dom';

import SpayProfile from './SpayProfile';
import MiscProfile from './MiscProfile';
import VaccineProfile from './VaccineProfile';
import { AnimalContext } from '../AnimalProfile';
const AnimalFullProfile = (props) => {
  const {
    animal: { _id: animalId },
  } = React.useContext(AnimalContext);
  return (
    <React.Fragment>
      <Link
        to={`/animals/${animalId}`}
        className='button profile-buttons bg-sandybrown'
      >
        View Full Profile
      </Link>
      <div className='profile-fullinfo'>
        <SpayProfile />
        <hr></hr>
        <VaccineProfile />
        <hr></hr>
        <MiscProfile />
      </div>
    </React.Fragment>
  );
};

export default AnimalFullProfile;
