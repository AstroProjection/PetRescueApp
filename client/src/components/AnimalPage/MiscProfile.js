import React from 'react';
import MiscItem from '../AnimalProfile/AnimalFullProfile/MiscItem';

const MiscProfile = ({ medicalInfo: { misc } }) => {
  return (
    <React.Fragment>
      {misc.length > 0 && (
        <div className='table'>
          <div className='tr'>
            <div className='th'>Misc.</div>
          </div>
          {misc.map((issue) => (
            <MiscItem ailment={issue.ailment} description={issue.description} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default MiscProfile;
