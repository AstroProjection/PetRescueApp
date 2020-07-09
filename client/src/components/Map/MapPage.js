import React from 'react';

import PropTypes from 'prop-types';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FormControl from 'react-bootstrap/FormControl';
import MapComponent from './MapComponent';

import { setLocality } from '../../store/actions/locality';
// import { getAllAnimals } from '../../store/actions/animal';
// import { getAllStreetData } from '../../store/actions/street';

import { connect } from 'react-redux';
// import AnimalPost from '../AnimalTracker/AnimalPost';

const MapPage = ({ setLocality, locality: { locality, loading } }) => {
  return (
    <React.Fragment>
      <div className='animal-tracker-title'>
        <h1>{locality ? locality.locality : 'Select a locality'}</h1>
      </div>
      <div className='map-containment'>
        <FormControl
          title='Change locality'
          as='select'
          className='locality-selector'
          defaultValue={''}
          onChange={(e) => setLocality(e.target.value)}
        >
          <option value='' disabled={true}>
            Select an option
          </option>
          <option value='victoria-layout'>Victoria Layout</option>
          <option value='ulsoor-1'>Ulsoor</option>
        </FormControl>
        {/* <Tabs defaultActiveKey='animal-tracker' id='uncontrolled-tab-example'> */}
        {/* <Tab eventKey='animal-tracker' title='Animal Tracker'> */}
        <div className='animal-tracker-text'>
          <strong>Click</strong> on the <strong>road</strong> to know about the
          animals there...
        </div>
        {/* </Tab> */}
        {/* <Tab eventKey='feeding-route' title='Feeding Routes' disabled></Tab> */}
        {/* <Tab eventKey='adoption' title='Adoption' disabled></Tab> */}
        {/* </Tabs> */}
        {!!locality && !loading && <MapComponent />}
      </div>
    </React.Fragment>
  );
};

MapPage.propTypes = {
  setLocality: PropTypes.func.isRequired,
  locality: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  locality: state.locality,
});

export default connect(mapStateToProps, { setLocality })(React.memo(MapPage));
