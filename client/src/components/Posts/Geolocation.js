import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents, useMap } from 'react-leaflet';
import { Box, Button, Flex, Text, Spinner, Icon, useToast, VStack } from '@chakra-ui/react';

// Syncs map view when the location updates programmatically
const MapViewUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

// Tracks user panning to update the "pin" location
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

const DEFAULT_LOCATION = [12.9716, 77.5946]; // Bangalore center fallback

const Geolocation = ({ values, setFieldValue, handleChange }) => {
  const [locationState, setLocationState] = useState(values.locationState);
  const [isLocating, setIsLocating] = useState(false);
  const toast = useToast();

  const handleViewPortChange = (viewPort) => {
    setFieldValue('locationState', viewPort);
    setLocationState(viewPort);
  };

  const fetchGeoLocation = (showToast = false) => {
    if (!('geolocation' in navigator)) {
      if (showToast) {
        toast({ title: "Geolocation not supported", status: "error", duration: 3000 });
      }
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = {
          center: [position.coords.latitude, position.coords.longitude],
          zoom: 17,
        };
        setFieldValue('locationState', newLoc);
        setLocationState(newLoc);
        setIsLocating(false);
        if (showToast) {
          toast({ title: "Location updated", status: "success", duration: 2000 });
        }
      },
      (error) => {
        setIsLocating(false);
        console.error("Location error:", error);
        if (locationState.center.length === 0) {
          // Set fallback if we don't even have a starting location
          const fallbackLoc = { center: DEFAULT_LOCATION, zoom: 13 };
          setFieldValue('locationState', fallbackLoc);
          setLocationState(fallbackLoc);
        }
        if (showToast) {
          toast({ 
            title: "Could not fetch location", 
            description: "Please ensure location permissions are enabled.",
            status: "warning", 
            duration: 4000 
          });
        }
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Run only once on mount
  useEffect(() => {
    if (values.locationState.center.length === 0) {
      fetchGeoLocation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasLocation = locationState.center && locationState.center.length > 0;

  return (
    <Box position="relative" w="100%">
      <input type='hidden' name='locationState' value={JSON.stringify(values.locationState)} />
      
      {/* Map Header with Reset Button */}
      <Flex justify="space-between" align="center" bg="gray.100" p={2} borderBottomWidth="1px" borderColor="gray.200">
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          <i className="fas fa-crosshairs" style={{ marginRight: '8px' }}></i>
          Drag the map to place the pin
        </Text>
        <Button 
          size="xs" 
          colorScheme="brand" 
          variant="outline" 
          onClick={() => fetchGeoLocation(true)}
          isLoading={isLocating}
          loadingText="Locating"
        >
          <i className="fas fa-location-arrow" style={{ marginRight: '5px' }}></i> Reset to My Location
        </Button>
      </Flex>

      {/* Map Container */}
      <Box h="300px" bg="gray.50" position="relative" display="flex" alignItems="center" justifyContent="center">
        {hasLocation ? (
          <React.Fragment>
            <MapContainer
              style={{ height: '100%', width: '100%', zIndex: 1 }}
              scrollWheelZoom={false}
              doubleClickZoom={true}
              center={locationState.center}
              zoom={locationState.zoom}
              zoomControl={false}
            >
              <MapViewUpdater center={locationState.center} zoom={locationState.zoom} />
              <ViewportTracker onViewportChange={handleViewPortChange} />
              <TileLayer
                attribution='&amp;copy OpenStreetMap contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </MapContainer>
            
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              zIndex: 2,
              pointerEvents: 'none'
            }}>
               <i className="fas fa-map-marker-alt" style={{ fontSize: '36px', color: '#e53e3e', filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.3))' }}></i>
            </div>
          </React.Fragment>
        ) : (
          <VStack color="gray.500">
            <Spinner size="xl" thickness="3px" color="brand.500" />
            <Text mt={2}>Requesting location access...</Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(Geolocation);
