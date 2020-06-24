import React from 'react';

const MiscItem = (props) => {
  const { ailment, description } = props;
  return (
    <React.Fragment>
      <div className='tr'>
        <div className='td'>{ailment}</div>
        <div className='td'>{description}</div>
      </div>
    </React.Fragment>
  );
};

export default MiscItem;
