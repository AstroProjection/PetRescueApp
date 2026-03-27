import React from 'react';
import moment from 'moment';

const VaccineItem = ({ vaccineName, dateTaken, dateDue }) => {
  return (
    <React.Fragment>
      <div className='tr'>
        <div className='td'>{vaccineName}</div>
        <div className='td'>
          {dateTaken ? moment(dateTaken).format('DD/MM/YYYY') : '-'}
        </div>
        <div className='td'>
          <strong>
            {dateDue ? moment(dateDue).format('DD/MM/YYYY') : '-'}
          </strong>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VaccineItem;
