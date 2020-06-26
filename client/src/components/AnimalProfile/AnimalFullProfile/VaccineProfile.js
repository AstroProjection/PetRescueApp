import React from 'react';
import VaccineItem from './VaccineItem';
import { AnimalContext } from '../AnimalProfile';

const VaccineProfile = (props) => {
  const {
    animal: {
      medical: { vaccines },
    },
  } = React.useContext(AnimalContext);
  return (
    <div className='table'>
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
            dateDue={vaccine.dateDue}
            dateTaken={vaccine.dateTaken}
            key={index}
          />
        ))
      ) : (
        <div className='tr'>
          <strong>None</strong>
        </div>
      )}
    </div>
  );
};

export default VaccineProfile;
