import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet';

// Inner component: fires handleViewPortChange whenever the user pans or zooms
const ViewportTracker = ({ onViewportChange }) => {
  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      onViewportChange({
        center: [map.getCenter().lat, map.getCenter().lng],
        zoom: map.getZoom(),
      });
    },
  });
  return null;
};

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
      () => {},
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
  }

  const markerClick = () => {};

  return (
    locationState.center.length > 0 && (
      <React.Fragment>
        <input
          type='hidden'
          name='locationState'
          value={values.locationState}
        />
        <br />
        <button type='button' onClick={() => fetchGeoLocation()}>
          Reset Location
        </button>
        <MapContainer
          className='post-map'
          scrollWheelZoom={false}
          doubleClickZoom={true}
          center={locationState.center}
          zoom={locationState.zoom}
          zoomControl={true}
          maxZoom={18}
          minZoom={15}
        >
          <ViewportTracker onViewportChange={handleViewPortChange} />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker
            position={locationState.center}
            eventHandlers={{ click: () => markerClick() }}
          >
            <Tooltip>Place marker on location</Tooltip>
          </Marker>
        </MapContainer>
      </React.Fragment>
    )
  );
};

export default React.memo(Geolocation);
