import React from 'react';
import { AnimalContext } from '../AnimalProfile';

const SpayProfile = (props) => {
  const {
    animal: {
      medical: {
        spayed: { status, hospital, date },
      },
    },
  } = React.useContext(AnimalContext);
  const resStatus = ['No', 'Yes', 'Unknown'];
  return (
    <div className='table spay-table'>
      <div className='tr'>
        <div className='th'>
          <em>
            <strong>Spayed</strong>
          </em>
        </div>
        <div className='th'>
          <strong>{resStatus[status]}</strong>
        </div>
      </div>

      {hospital && (
        <div className='tr'>
          <div className='td'>
            <em>
              <strong>Hospital</strong>
            </em>
          </div>
          <div className='td'>{hospital}</div>
        </div>
      )}
      {date && (
        <div className='tr'>
          <div className='td'>
            <em>
              <strong>Date</strong>
            </em>
          </div>
          <div className='td'>{date}</div>
        </div>
      )}
    </div>
  );
};

export default SpayProfile;
