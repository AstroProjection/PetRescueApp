import React from 'react';
import PropTypes from 'prop-types';

const AnimalFullProfile = (props) => {
  return (
    <React.Fragment>
      <div className='profile-fullinfo'>
        <div className='table'>
          {/* <div className='thead'> */}
          <div className='tr'>
            <div className='th'>Spayed</div>
            <div className='th'>yes/no/NA</div>
          </div>
          {/* </div> */}
          <div className='tr'>
            <div className='td'>hospital</div>
            <div className='td'>hospital-name</div>
          </div>
          <div className='tr'>
            <div className='td'>date</div>
            <div className='td'>dd-mm-yyyy</div>
          </div>
        </div>
        <div className='table'>
          <div className='tr'>
            <div className='th'>Vaccines</div>
            <div className='th'></div>
            <div className='th'></div>
          </div>
          <div className='tr'>
            <div className='td'>HPV/Rabies...</div>
            <div className='td'>date-taken</div>
            <div className='td'>due-date</div>
          </div>
          <div className='tr'>
            <div className='td'>HPV/Rabies...</div>
            <div className='td'>date-taken</div>
            <div className='td'>due-date</div>
          </div>
          <div className='tr'>
            <div className='td'>HPV/Rabies...</div>
            <div className='td'>date-taken</div>
            <div className='td'>due-date</div>
          </div>
        </div>

        <div className='table'>
          <div className='tr'>
            <div className='th'>Misc.</div>
          </div>
          <div className='tr'>
            <div className='td'>Issue 1:</div>
            <div className='td'>information</div>
          </div>
          <div className='tr'>
            <div className='td'>Issue 2:</div>
            <div className='td'>information</div>
          </div>
          <div className='tr'>
            <div className='td'>Issue 3:</div>
            <div className='td'>information</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

AnimalFullProfile.propTypes = {};

export default AnimalFullProfile;
