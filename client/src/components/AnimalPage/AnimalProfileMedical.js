import React from 'react';
// import Moment from 'react-moment';
import VaccineProfile from './VaccineProfile';
import MiscProfile from './MiscProfile';

const spayTags = ['No', 'Yes', "Don't know"];

const AnimalProfileMedical = ({ animal }) => {
  const medicalInfo = animal.medical;
  return (
    <div className='animalprofile-medical bg-ternary'>
      <h2>Medical Information</h2>
      <hr />
      <div className='animalprofile-vaccinations'>
        <h5>Vaccination</h5>
        {medicalInfo.vaccines.length > 0 ? (
          <VaccineProfile medicalInfo={medicalInfo} />
        ) : (
          'No vaccination records...'
        )}
      </div>
      <hr />
      <div className='animalprofile-spayinformation'>
        <h5>Spay Information</h5>
        Spayed : {spayTags[medicalInfo.spayed.status]}
      </div>
      <hr />
      {medicalInfo.misc.length > 0 ? (
        <MiscProfile medicalInfo={medicalInfo} />
      ) : (
        <div className='button add-button'>Add additional medical info</div>
      )}
    </div>
  );
};

export default AnimalProfileMedical;
