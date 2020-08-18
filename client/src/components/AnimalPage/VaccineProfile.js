import React from 'react';
import VaccineItem from '../AnimalProfile/AnimalFullProfile/VaccineItem';

const VaccineProfile = ({ medicalInfo }) => {
  const { vaccines } = medicalInfo;
  return (
    <React.Fragment>
      <div className='table animalprofile-vaccine'>
        <div className='tr'>
          <div className='th'>
            <em>
              <strong>Vaccination</strong>
            </em>
          </div>
          <div className='th'>
            <em>
              <strong>Date taken</strong>
            </em>
          </div>
          <div className='th'>
            <strong>DUE Date</strong>
          </div>
        </div>

        {vaccines.length > 0 ? (
          vaccines.map((vaccine, index) => (
            <VaccineItem
              vaccineName={vaccine.vaccinename}
              dateDue={vaccine.vaccineDateDue}
              dateTaken={vaccine.vaccineDateTaken}
              key={index}
            />
          ))
        ) : (
          <div className='tr'>
            <strong>None</strong>
          </div>
        )}
      </div>
      <div className='animalprofile-vaccineinfo'>
        vaccine additional information
      </div>
    </React.Fragment>
  );
};

export default VaccineProfile;
