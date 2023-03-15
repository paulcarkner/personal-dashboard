//Code adapted from: https://www.npmjs.com/package/@react-google-maps/api

import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100% - 1em)",
  marginTop: "1em",
};

type Props = {
  lat: number;
  lng: number;
  zoom: number;
};

function MyComponent({ lat, lng, zoom }: Props) {
  const center = { lat: lat, lng: lng };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC7r91IbCUuDCqHJJLngX1QkC_7D7ybeD4",
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
