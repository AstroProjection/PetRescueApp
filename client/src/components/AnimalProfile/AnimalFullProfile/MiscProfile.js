import React from 'react';

import { AnimalContext } from '../AnimalProfile';
import MiscItem from './MiscItem';
const MiscProfile = (props) => {
  const {
    animal: {
      medical: { misc },
    },
  } = React.useContext(AnimalContext);
  // console.log(misc);
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
