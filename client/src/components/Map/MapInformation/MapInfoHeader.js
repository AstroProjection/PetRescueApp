import React from 'react';

export const MapInfoHeader = (props) => {
  const { setDisplayInfo, displayInformation, street } = props;
  return (
    <>
      <div className='btn map-center' onClick={(e) => setDisplayInfo(false)}>
        <i className='fas fa-angle-left'></i>Back to Map
      </div>
      <h2>
        {street ? (
          <React.Fragment>
            <span>{`${street.displayName}: `}</span>
          </React.Fragment>
        ) : (
          <>Victoria Layout</>
        )}
      </h2>
    </>
  );
};
