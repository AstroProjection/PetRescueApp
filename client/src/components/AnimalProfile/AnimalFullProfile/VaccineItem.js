import React from 'react';
import PropTypes from 'prop-types';

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

VaccineItem.propTypes = {};

export default VaccineItem;
