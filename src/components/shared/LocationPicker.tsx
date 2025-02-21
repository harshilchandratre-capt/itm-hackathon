import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

const LocationPicker = () => {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={selectedLocation}
        onClick={handleMapClick}
      >
        <Marker position={selectedLocation} />
      </GoogleMap>
      <div>
        Selected Location: Latitude {selectedLocation.lat}, Longitude{" "}
        {selectedLocation.lng}
      </div>
    </div>
  );
};

export default LocationPicker;
