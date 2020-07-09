import React from 'react';
import { connect } from 'react-redux';

const MapInfoHeader = (props) => {
  const { setDisplayInfo, street, locality } = props;
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
          <>{locality ? locality.locality.locality : ''}</>
        )}
      </h2>
    </>
  );
};

const mapStateToProps = (state) => ({
  locality: state.locality,
});

export default connect(mapStateToProps)(MapInfoHeader);
