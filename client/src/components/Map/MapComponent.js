import React from 'react';
import { Map, TileLayer, Marker, Tooltip, Popup, GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setCurrentStreet,
  updateStreetsToDB,
  fetchStreetData,
} from '../../store/actions/street';

import MapInformation from './MapInformation';
import roadsJson from '../../resources/victoria-layout.json';

const MapComponent = ({
  updateStreetsToDB,
  setCurrentStreet,
  isLoggedin,
  updatedDB,
  // street: { street },
}) => {
  const DEFAULT_COLOUR = '#3388FF';
  const ACTIVE_COLOUR = '#00FFFF';

  // const [locationState, setState] = React.useState({
  //   lng: 77.6145,
  //   lat: 12.96421,
  //   zoom: 17,
  // });

  const locationState = {
    lng: 77.6145,
    lat: 12.96421,
    zoom: 17,
  };

  const position = [locationState.lat, locationState.lng];

  const addHighlight = (e) => {
    const layer = e.target;
    layer.setStyle({
      color: ACTIVE_COLOUR,
    });
  };

  const removeHighlight = (e) => {
    const layer = e.target;
    layer.setStyle({
      color: DEFAULT_COLOUR,
    });
  };

  const setActiveStreet = (e) => {
    // console.log(e);
    setCurrentStreet(e.target.feature.properties.name);
  };

  const onEachFeature = (feature, layer) => {
    const toolTipContent = ` <Tooltip>Click for details of <strong>${feature.properties.displayName}</strong></pre></Tooltip>`;
    layer.bindTooltip(toolTipContent);
    const popupContent = ` <Popup><br/> <strong>${feature.properties.displayName}</strong> information:</pre></Popup>`;
    layer.bindPopup(popupContent);

    layer.setStyle({
      fill: 'true',
      fillColor: 'green',
    });

    layer.on({
      mouseover: addHighlight,
      mouseout: removeHighlight,
      click: setActiveStreet,
    });
  };

  const markerClick = () => {};

  React.useEffect(() => {
    console.log('useEffect', isLoggedin);
    isLoggedin && !updatedDB ? updateStreetsToDB(roadsJson) : fetchStreetData();
  }, [updateStreetsToDB, isLoggedin]);

  console.log('log before return');
  return (
    <div className='map-contents'>
      <Map
        center={position}
        zoom={locationState.zoom}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        closePopupOnClick={true}
        // onClick={() => onClick()}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position} onclick={() => markerClick()}>
          <Tooltip>Victoria Layout</Tooltip>
        </Marker>

        <GeoJSON data={roadsJson} onEachFeature={onEachFeature} />
      </Map>
      <MapInformation />
    </div>
  );
};

MapComponent.propTypes = {
  updateStreetsToDB: PropTypes.func.isRequired,
  setCurrentStreet: PropTypes.func.isRequired,
  isLoggedin: PropTypes.bool.isRequired,
  updatedDB: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
  updatedDB: state.street.updatedDB,
});

export default connect(mapStateToProps, {
  updateStreetsToDB,
  setCurrentStreet,
})(React.memo(MapComponent));
