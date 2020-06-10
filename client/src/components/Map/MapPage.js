import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MapComponent from './MapComponent';
// import { getAllAnimals } from '../../store/actions/animal';
// import { getAllStreetData } from '../../store/actions/street';

import { connect } from 'react-redux';
// import AnimalPost from '../AnimalTracker/AnimalPost';

const MapPage = (props) => {
  console.log('MapPage Rendering');

  React.useEffect(() => {
    // getAllAnimals();
  }, []);

  return (
    <React.Fragment>
      <h1>Victoria layout</h1>
      <div className='map-containment'>
        {/* <AnimalButtons /> */}
        <Tabs defaultActiveKey='animal-tracker' id='uncontrolled-tab-example'>
          <Tab eventKey='animal-tracker' title='Animal Tracker'>
            Click on the road to know about the animals there...
          </Tab>
          <Tab eventKey='feeding-route' title='Feeding Routes' disabled></Tab>
          <Tab eventKey='adoption' title='Adoption' disabled></Tab>
        </Tabs>
        <MapComponent />
      </div>
    </React.Fragment>
  );
};

export default connect(null, null)(MapPage);
