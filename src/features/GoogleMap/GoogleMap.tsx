//Code adapted from: https://www.npmjs.com/package/@react-google-maps/api

import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
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

  //const [map, setMap] = React.useState(null);

  // const onLoad = React.useCallback(
  //   function callback(map: any) {
  //     //map.setZoom(zoom);
  //     //setMap(map);
  //   },
  //   []
  // );

  // const onUnmount = React.useCallback(function callback(map: any) {
  //   //setMap(null);
  // }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
