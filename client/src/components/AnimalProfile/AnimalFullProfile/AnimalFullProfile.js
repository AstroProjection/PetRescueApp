import React from 'react';

import SpayProfile from './SpayProfile';
import MiscProfile from './MiscProfile';
import VaccineProfile from './VaccineProfile';

const AnimalFullProfile = (props) => {
  return (
    <React.Fragment>
      <div className='profile-fullinfo'>
        <SpayProfile />
        <VaccineProfile />
        <MiscProfile />
      </div>
    </React.Fragment>
  );
};

export default AnimalFullProfile;
