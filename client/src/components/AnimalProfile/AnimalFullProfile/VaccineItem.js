import React from 'react';
import Moment from 'react-moment';

const VaccineItem = ({ vaccineName, dateTaken, dateDue }) => {
  return (
    <React.Fragment>
      <div className='tr'>
        <div className='td'>{vaccineName}</div>
        <div className='td'>
          {dateTaken ? <Moment format='DD/MM/YYYY'>{dateTaken}</Moment> : '-'}
        </div>
        <div className='td'>
          <strong>
            {dateDue ? <Moment format='DD/MM/YYYY'>{dateDue}</Moment> : '-'}
          </strong>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VaccineItem;
