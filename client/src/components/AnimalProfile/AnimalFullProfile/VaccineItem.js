import React from 'react';

const VaccineItem = ({ vaccineName, dateTaken, dateDue }) => {
  return (
    <React.Fragment>
      <div className='tr'>
        <div className='td'>{vaccineName}</div>
        <div className='td'>{dateTaken}</div>
        <div className='td'>
          <strong>{dateDue}</strong>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VaccineItem;
