import React from 'react';
import { Map, TileLayer, Marker, Tooltip, Popup, GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setCurrentStreet,
  // updateStreetsToDB,
  fetchStreetData,
} from '../../store/actions/street';

import MapInformation from './MapInformation/MapInformation';

const MapComponent = ({
  setCurrentStreet,
  fetchStreetData,
  street: { street, streets },
  locality: { locality, loading },
  device: { isMobile },
}) => {
  const DEFAULT_COLOUR = '#3388FF';
  const ACTIVE_COLOUR = '#00FFFF';

  let initCenter = locality.position;

  const dogCount = street ? street.dogs.length : 0;
  const catCount = street ? street.cats.length : 0;

  const [clickedLayer, setClickedLayer] = React.useState();
  const [displayInformation, setDisplayInfo] = React.useState(false);
  const [locationState, setLocationState] = React.useState(initCenter);
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

  const onClick = (e) => {
    setClickedLayer(e.target);
    addHighlight(e);
  };

  React.useEffect(() => {
    if (!clickedLayer) return;
    const popupContent = `
    <Popup>
      <br /> <strong>${clickedLayer.feature.properties.displayName}:
      <br/>  <strong>Total</strong>
      <br/>  Dogs:${
        streets.filter(
          (street) => street.streetname === clickedLayer.feature.properties.name
        )[0].dogs.length
      }              
      <br/>  Cats:${
        streets.filter(
          (street) => street.streetname === clickedLayer.feature.properties.name
        )[0].cats.length
      }              
      </pre></strong>
      <br/>
      <br/>
        <strong><em>Double Click</em></strong> <br/>
        to access road Information
    </Popup>
  `;
    clickedLayer.closeTooltip();
    clickedLayer.setPopupContent(popupContent);
    console.log('this is entering');
  }, [streets, clickedLayer]);

  const markerClick = () => {};

  const onEachFeature = (feature, layer) => {
    const toolTipContent = ` <Tooltip><strong>Click</strong> for details of <strong>${feature.properties.displayName}</strong></pre></Tooltip>`;
    layer.bindTooltip(toolTipContent).openTooltip();
    console.log('oneachfeature');
    const popupContent = `
      <Popup>
        <br /> <strong>${feature.properties.displayName}:
        <br/>  <strong>Total</strong>
        <br/>  Dogs:${dogCount}              
        <br/>  Cats:${catCount}              
        </strong>
        <br/>
        <br/>
        <strong><em>Double Click</em></strong> <br/>
        to access road Information
      </Popup>
    `;

    layer.bindPopup(popupContent);

    layer.setStyle({
      fill: 'true',
      fillColor: 'white',
      weight: isMobile ? 9 : 5,
      opacity: 0.7,
    });

    layer.on({
      mouseover: addHighlight,
      mouseout: removeHighlight,
      click: onClick,
      dblclick: setActiveStreet,
      popupclose: removeHighlight,
    });
  };
  console.log('render');

  React.useEffect(() => {
    if (locality) fetchStreetData(locality._id);
  }, [locality, fetchStreetData]);
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
          {locality && !loading && (
            <Map
              className='animal-tracker-map'
              key={'1'}
              scrollWheelZoom={false}
              doubleClickZoom={false}
              center={position}
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
                <Tooltip>{locality.locality}</Tooltip>
              </Marker>

              <GeoJSON
                key={locality.locality_unique}
                id='geojson_roads'
                data={locality}
                onEachFeature={onEachFeature}
              />
            </Map>
          )}
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
  // updateStreetsToDB: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedin: state.auth.isLoggedin,
  street: state.street,
  locality: state.locality,
  device: state.device,
});

export default connect(mapStateToProps, {
  // updateStreetsToDB,
  setCurrentStreet,
  fetchStreetData,
})(MapComponent);
