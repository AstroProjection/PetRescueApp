import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';

import AnimalList from '../AnimalProfile/AnimalList';
import { getStreetAnimals } from '../../store/actions/animal';

const MapInformation = ({
  animals,
  street: { street, loading },
  getStreetAnimals,
}) => {
  React.useEffect(() => {
    console.log('map information useEffect');
    street && !loading && getStreetAnimals(street);
  }, [street, loading, getStreetAnimals]);

  return loading ? (
    <Spinner />
  ) : (
    <div className=''>
      <h2>
        {street ? (
          <React.Fragment>{`${street.displayName}: `}</React.Fragment>
        ) : (
          ''
        )}
      </h2>
      <div>
        Information box:
        <br />
        Dogs:{street ? street.dogs.length : '0'}
        {street && street.dogs.length > 0 ? (
          <AnimalList index={`1`} animal={`dogs`} />
        ) : (
          <React.Fragment>
            <div>None...</div>
          </React.Fragment>
        )}
        <br />
        Cats:{street ? street.cats.length : '0'}
        {street && street.cats.length > 0 ? (
          <AnimalList index={`2`} animal={`cats`} />
        ) : (
          <React.Fragment>
            <div>None...</div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

MapInformation.propTypes = {
  animals: PropTypes.object.isRequired,
  getStreetAnimals: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  animals: state.animals,
  street: state.street,
});

export default connect(mapStateToProps, { getStreetAnimals })(MapInformation);
