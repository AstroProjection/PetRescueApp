import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MapInformation from './MapInformation';
import PropTypes from 'prop-types';

const MapComponent = (props) => {
  console.log('MapComponent Rendering');
  const [locationState, setState] = React.useState({
    lng: 77.6153,
    lat: 12.96419,
    zoom: 17,
  });
  const position = [locationState.lat, locationState.lng];

  const showMap = () => {
    alert('loaded');
  };

  // React.useEffect(() => {
  //   alert('loaded');
  // }, []);

  return (
    <div className='map-contents'>
      <Map
        center={position}
        zoom={locationState.zoom}
        dragging={false}
        scrollWheelZoom={false}
        // whenReady={() => showMap()}
        zoomControl={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>Victoria Layout</Popup>
        </Marker>
      </Map>
      <MapInformation />
    </div>
  );
};

MapComponent.propTypes = {};

export default React.memo(MapComponent);
