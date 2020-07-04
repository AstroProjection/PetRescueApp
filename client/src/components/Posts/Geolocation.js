import React from 'react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Tooltip, Popup, GeoJSON } from 'react-leaflet';
import Spinner from '../Layout/Spinner';

const Geolocation = ({ values, setFieldValue }) => {
  const [locationState, setLocationState] = React.useState({
    center: [],
    zoom: 17,
  });
  //  center:[lat,lng]
  //  zoom:'int'
  //
  //   const success = (position) => {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     setLocationState({ ...locationState, center: [latitude, longitude] });
  //   };

  const handleViewPortChange = (viewPort) => {
    setFieldValue('locationState', viewPort);
    setLocationState(viewPort);
  };

  //   const error = (geoLocationObj) => {
  //     console.log('geolocation failed');
  //   };

  const geolocation = navigator.geolocation;
  if ('geolocation' in navigator) {
    if (locationState.center.length == 0) {
      console.log('geoLocating');
      geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocationState({ ...locationState, center: [latitude, longitude] });
        },
        (geoLocationObj) => {
          console.log('geolocation failed');
          console.log(geoLocationObj);
        },
        {
          enableHighAccuracy: true,
          timeout: 3000,
        }
      );
    }
  } else {
    console.log('cannot geolocate');
  }

  const markerClick = () => {
    console.log('marker clicked');
  };

  return (
    locationState.center.length > 0 && (
      <React.Fragment>
        <input
          type='hidden'
          name='locationState'
          value={values.locationState}
        />
        <Map
          className='post-map'
          key={'2'}
          scrollWheelZoom={false}
          doubleClickZoom={true}
          center={locationState.center}
          zoomControl={true}
          closePopupOnClick={true}
          viewport={locationState}
          onViewportChanged={(viewport) => handleViewPortChange(viewport)}
          maxZoom={`18`}
          minZoom={`15`}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={locationState.center} onClick={() => markerClick()}>
            <Tooltip>Place marker on location</Tooltip>
          </Marker>
        </Map>
      </React.Fragment>
    )
  );
};

export default React.memo(Geolocation);
