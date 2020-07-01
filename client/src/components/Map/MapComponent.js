import React from 'react';
import { Map, TileLayer, Marker, Tooltip, Popup, GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setCurrentStreet,
  updateStreetsToDB,
  fetchStreetData,
} from '../../store/actions/street';

import MapInformation from './MapInformation/MapInformation';
import roadsJson from '../../resources/victoria-layout.json';

const MapComponent = ({
  setCurrentStreet,
  fetchStreetData,
  street: { street },
}) => {
  const DEFAULT_COLOUR = '#3388FF';
  const ACTIVE_COLOUR = '#00FFFF';

  const initCenter = {
    center: [12.96421, 77.6145],
    zoom: 17,
  };

  const dogCount = street ? street.dogs.length : 0;
  const catCount = street ? street.cats.length : 0;

  const [clickedLayer, setClickedLayer] = React.useState();
  const [displayInformation, setDisplayInfo] = React.useState(false);

  const [locationState, setLocationState] = React.useState(initCenter);

  const mobileWindow = window.innerWidth <= 1000;

  // const center = {
  //   lng: 77.6145,
  //   lat: 12.96421,
  //   zoom: 17,
  // };
  // [lat,lng]
  const position = [initCenter.center[0], initCenter.center[1]];

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
    setCurrentStreet(e.target.feature.properties.name);
    setClickedLayer(e.target);
    setDisplayInfo(true);
  };

  React.useEffect(() => {
    if (!clickedLayer) return;
    const popupContent = `
    <Popup>
      <br /> <strong>${clickedLayer.feature.properties.displayName}:
      <br/>  <strong>Total</strong>
      <br/>  Dogs:${dogCount}              
      <br/>  Cats:${catCount}              
      </pre></strong>
    </Popup>
  `;
    clickedLayer.setPopupContent(popupContent);
  }, [street, catCount, clickedLayer, dogCount]);

  const markerClick = () => {};

  const onEachFeature = (feature, layer) => {
    const toolTipContent = ` <Tooltip>Click for details of <strong>${feature.properties.displayName}</strong></pre></Tooltip>`;
    layer.bindTooltip(toolTipContent).openTooltip();
    console.log('oneachfeature');
    const popupContent = `
      <Popup>
        <br /> <strong>${feature.properties.displayName}:
        <br/>  <strong>Total</strong>
        <br/>  Dogs:${dogCount}              
        <br/>  Cats:${catCount}              
        </strong>
      </Popup>
    `;

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

  React.useEffect(() => {
    console.log('map component fetchingStreetData');
    fetchStreetData();
  }, [fetchStreetData]);

  console.log('render');

  // console.log(displayInformation);
  return (
    <div className='map-contents'>
      {!displayInformation && (
        <React.Fragment>
          <div>
            <div
              className='btn map-center'
              onClick={(e) => {
                if (
                  locationState.center[0] === initCenter.center[0] &&
                  locationState.center[1] === initCenter.center[1]
                )
                  return;
                setLocationState(initCenter);
              }}
            >
              <i className='fas fa-map-marker'></i>Center the Map
            </div>
          </div>
          <Map
            // center={center}
            // zoom={locationState.zoom}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            zoomControl={true}
            closePopupOnClick={true}
            viewport={locationState}
            onViewportChanged={(viewport) => setLocationState(viewport)}
            maxZoom={`${initCenter.zoom + 1}`}
            minZoom={`${initCenter.zoom - 1}`}
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
        </React.Fragment>
      )}

      {displayInformation && (
        <MapInformation
          displayInformation={displayInformation}
          setDisplayInfo={setDisplayInfo}
        />
      )}
    </div>
  );
};

MapComponent.propTypes = {
  setCurrentStreet: PropTypes.func.isRequired,
  fetchStreetData: PropTypes.func.isRequired,
  updateStreetsToDB: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
  street: state.street,
});

export default connect(mapStateToProps, {
  updateStreetsToDB,
  setCurrentStreet,
  fetchStreetData,
})(React.memo(MapComponent));
