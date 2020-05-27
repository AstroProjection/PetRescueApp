import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MapComponent from './MapComponent';
import { getAllAnimals } from '../../store/actions/animal';

import { connect } from 'react-redux';

const MapPage = ({ getAllAnimals }) => {
  console.log('MapPage Rendering');

  React.useEffect(() => {
    getAllAnimals();
  }, []);

  return (
    <React.Fragment>
      <h1>Victoria layout</h1>
      <div className='map-containment'>
        <Tabs defaultActiveKey='animal-tracker' id='uncontrolled-tab-example'>
          <Tab eventKey='animal-tracker' title='Animal Tracker'></Tab>
          <Tab eventKey='feeding-route' title='Feeding Routes'></Tab>
          <Tab eventKey='adoption' title='Adoption' disabled></Tab>
        </Tabs>
        <MapComponent />
      </div>
    </React.Fragment>
  );
};

MapPage.propTypes = {
  getAllAnimals: PropTypes.func.isRequired,
};

export default connect(null, { getAllAnimals })(MapPage);
