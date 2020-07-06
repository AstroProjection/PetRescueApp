import React from 'react';

import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';

const Geolocation = ({ values, setFieldValue }) => {
  const [locationState, setLocationState] = React.useState(
    values.locationState
  );
  //  center:[lat,lng]
  //  zoom:'int'

  const handleViewPortChange = (viewPort) => {
    setFieldValue('locationState', viewPort);
    setLocationState(viewPort);
  };

  const fetchGeoLocation = () => {
    geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setFieldValue('locationState', {
          ...locationState,
          center: [latitude, longitude],
        });
        setLocationState({ ...locationState, center: [latitude, longitude] });
      },
      (geoLocationObj) => {
        alert('geolocation failed');
        alert(geoLocationObj.position);
      },
      {
        enableHighAccuracy: true,
        timeout: 2000,
      }
    );
  };
  const geolocation = navigator.geolocation;
  if ('geolocation' in navigator) {
    if (values.locationState.center.length === 0) {
      fetchGeoLocation();
    }
  } else {
    alert('cannot geolocate');
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
        <br />
        <button type='button' onClick={(e) => fetchGeoLocation()}>
          Reset Location
        </button>
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
