import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../Layout/Spinner';

import { getStreetAnimals } from '../../../store/actions/animal';
import { getLocalityInfo } from '../../../store/actions/locality';
import AnimalButtons from '../../AnimalTracker/AnimalButtons';
import { MapInfoHeader } from './MapInfoHeader';
import MapInfoListing from './MapInfoListing';

const MapInformation = ({
  street: { street, loading },
  getStreetAnimals,
  getLocalityInfo,
  displayInformation,
  setDisplayInfo,
}) => {
  React.useEffect(() => {
    console.log('map information rendering');
    street ? getStreetAnimals(street._id) : getLocalityInfo('victoria-layout');
  }, [street, getStreetAnimals, getLocalityInfo]);

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div className='map-information'>
        <MapInfoHeader
          street={street}
          displayInformation={displayInformation}
          setDisplayInfo={setDisplayInfo}
        />
        <div className='information-box'>
          <AnimalButtons />
          <br />
          <MapInfoListing
            street={street}
            faClass={'fas fa-dog'}
            faSize={'large'}
            animal={'dogs'}
            index={'1'}
            heading={'Dogs'}
          />
          <br />
          <MapInfoListing
            street={street}
            faClass={'fas fa-cat'}
            faSize={'large'}
            animal={'cats'}
            index={'2'}
            heading={'Cats'}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

MapInformation.propTypes = {
  animals: PropTypes.object.isRequired,
  getStreetAnimals: PropTypes.func.isRequired,
  getLocalityInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  animals: state.animals,
  street: state.street,
});

export default connect(mapStateToProps, { getStreetAnimals, getLocalityInfo })(
  MapInformation
);
