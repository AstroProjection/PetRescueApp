import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import MapComponent from './MapComponent';

import { setCurrentLocality } from '../../store/actions/locality';
// import { getAllAnimals } from '../../store/actions/animal';
// import { getAllStreetData } from '../../store/actions/street';

import { connect } from 'react-redux';
// import AnimalPost from '../AnimalTracker/AnimalPost';

const MapPage = ({ locality: { locality } }) => {
  // const localityList = ['Victoria Layout', 'Ulsoor'];

  const [activeLocality, setLocality] = React.useState('');

  const onChange = (e) => {
    console.log('onChange');
    console.dir(e);
  };

  return (
    <React.Fragment>
      <h1>{locality ? locality : 'Please select a locality'}</h1>
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

        <Tabs defaultActiveKey='animal-tracker' id='uncontrolled-tab-example'>
          <Tab eventKey='animal-tracker' title='Animal Tracker'>
            <strong>Click</strong> on the <strong>road</strong> to know about
            the animals there...
          </Tab>
          {/* <Tab eventKey='feeding-route' title='Feeding Routes' disabled></Tab> */}
          {/* <Tab eventKey='adoption' title='Adoption' disabled></Tab> */}
        </Tabs>
        {!!activeLocality && <MapComponent selectedLocality={activeLocality} />}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  locality: state.locality,
});

export default connect(mapStateToProps, null)(React.memo(MapPage));
