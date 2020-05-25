import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MapComponent from './MapComponent';

const MapPage = (props) => {
  console.log('MapPage Rendering');
  return (
    <React.Fragment>
      <h1>Victoria layout</h1>
      <div className='map-containment'>
        <Tabs defaultActiveKey='home' id='uncontrolled-tab-example'>
          <Tab eventKey='home' title='Adoption'></Tab>
          <Tab eventKey='profile' title='Animal Tracker'></Tab>
          <Tab eventKey='contact' title='Feeding Routes'></Tab>
        </Tabs>
        <MapComponent />
      </div>
    </React.Fragment>
  );
};

MapPage.propTypes = {};

export default MapPage;
