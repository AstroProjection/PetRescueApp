import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';

import AnimalList from '../AnimalProfile/AnimalList';
import { getStreetAnimals } from '../../store/actions/animal';
import AnimalButtons from '../AnimalTracker/AnimalButtons';
import Accordion from 'react-bootstrap/Accordion';

const MapInformation = ({
  animals: { loading: animalsLoading },
  street: { street, loading },
  getStreetAnimals,
}) => {
  React.useEffect(() => {
    street && !loading && getStreetAnimals(street);
  }, [street, loading, getStreetAnimals]);

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div className='map-information'>
        <h2>
          {street ? (
            <React.Fragment>{`${street.displayName}: `}</React.Fragment>
          ) : (
            <>Victoria layout</>
          )}
        </h2>
        <div className='information-box'>
          <AnimalButtons />
          {/* Information box: */}
          <br />
          <i className='fas fa-dog'></i>
          {street ? ` ${street.dogs.length} ` : ' 0 '}
          Dogs
          {
            <React.Fragment>
              <Accordion>
                <AnimalList
                  index={`1`}
                  animal={`dogs`}
                  faClass={`fas fa-dog`}
                />
              </Accordion>
            </React.Fragment>
          }
          <br />
          <i className='fas fa-cat'></i>
          {street ? ` ${street.cats.length} ` : ' 0 '}
          Cats
          {
            <React.Fragment>
              <Accordion>
                <AnimalList
                  index={`2`}
                  animal={`cats`}
                  faClass={`fas fa-cat`}
                />
              </Accordion>
            </React.Fragment>
          }
        </div>
      </div>
    </React.Fragment>
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
