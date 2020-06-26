import React from 'react';

const VaccineItem = (props) => {
  const { vaccine } = props;
  return (
    <React.Fragment>
      <div className='tr'>
        <div className='td'>{vaccine.vaccinename}</div>
        <div className='td'>{vaccine.dateTaken}</div>
        <div className='td'>{vaccine.dateDue}</div>
      </div>
    </React.Fragment>
  );
};

VaccineItem.propTypes = {};

export default VaccineItem;
