import React from "react";
import { useSelector } from "react-redux";
import BaseUrl from "../../BaseUrl";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";

const libraries = ["places"];

const MapAndGallery = () => {
  const { merchantDetails } = useSelector((s) => s.root.merchant);
  const { isLoaded, loadError } = useJsApiLoader({
    libraries,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const onMapLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: +merchantDetails?.latitude,
      lng: +merchantDetails?.longitude,
    });
    map.fitBounds(bounds);
  };
  const containerStyle = {
    width: "100%",
    height: "60vh",
  };

  return (
    <div className="w-full grid lg:grid-cols-2 gap-3">
      <p className="font-semibold md:text-3xl text-xl">Map</p>
      <p className="font-semibold md:text-3xl text-xl lg:block hidden">Gallery</p>
      {loadError !== undefined && isLoaded ? (
        <div className="w-full text-center text-2xl font-semibold p-4 mx-auto text-red-500">
          {loadError.message}
        </div>
      ) : !isLoaded && loadError === undefined ? (
        <div className="w-full text-center text-2xl font-semibold p-4 mx-auto">
          Loading Map...
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
          center={{
            lat: +merchantDetails?.latitude,
            lng: +merchantDetails?.longitude,
          }}
          onLoad={onMapLoad}
          // onUnmount={onUnmount}
          // ref={mapRef}
          options={{
            maxZoom: 20,
            fullscreenControl: false,
            mapTypeControl: false,
            clickableIcons: false,
            streetViewControl: false,
            streetViewControlOptions: false,
          }}
        >
          <Marker
            position={{
              lat: +merchantDetails?.latitude,
              lng: +merchantDetails?.longitude,
            }}
            animation={window.google.maps.Animation}
            clickable={false}
          />
        </GoogleMap>
      )}
      {/* map */}
      {/* <div className="w-full h-full bg-gray-200 rounded-2xl">
        <img
          loading="lazy"
          src={require("../../assets/images/map.png")}
          alt=""
          className="w-full h-full rounded-2xl"
        />
      </div> */}
      <p className="font-semibold md:text-3xl text-xl lg:hidden">Gallery</p>
      <div
        className={`w-full h-full grid lg:grid-rows-2 grid-rows-${
          merchantDetails?.images?.length >= 4 ? "2" : "1"
        } gap-3`}
      >
        <div
          className={`w-full h-full flex lg:flex-nowrap flex-wrap items-stretch justify-stretch gap-3`}
        >
          {merchantDetails?.images.slice(0, 3).map((image) => (
            <img
              key={image}
              loading="lazy"
              src={BaseUrl.concat(image)}
              alt=""
              className={`lg:w-1/3 md:w-[32%] w-[48%] md:h-full h-40 object-cover rounded-2xl`}
            />
          ))}
        </div>
        {merchantDetails?.images.length >= 4 && (
          <div
            className={` w-full h-full flex items-stretch justify-stretch gap-3`}
          >
            {merchantDetails?.images.slice(3, 6).map((image) => (
              <img
                key={image}
                loading="lazy"
                src={BaseUrl.concat(image)}
                alt=""
                className={`w-1/3 h-full rounded-2xl`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapAndGallery;
