import React, { useCallback, useEffect, useState } from "react";
import { State, Country, City } from "country-state-city";
import { useSelector } from "react-redux";

const useCountryCityState = ({ selectedCountry, selectedState }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { user } = useSelector((s) => s.root.auth);
  const { allData, loading, searchParams } = useSelector(
    (s) => s.root.merchant
  );
  const selectedCountryStates = () => {
    const findSelectedCountry = Country.getAllCountries().find(
      (c) => c.name === selectedCountry
    );
    const states = State.getAllStates().filter(
      (state) => state?.countryCode === findSelectedCountry?.isoCode
    );
    setStates(states.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const selectedStateCities = () => {
    const findSelectedState = State.getAllStates().find(
      (c) => c.name === selectedState
    );
    const cities = City.getAllCities().filter(
      (city) => city?.stateCode === findSelectedState?.isoCode
    );

    setCities(cities.sort((a, b) => a.name.localeCompare(b.name)));
  };

  useEffect(() => {
    setCountries(
      Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name))
    );
  }, []);

  useEffect(() => {
    selectedCountryStates();
  }, [countries, selectedCountry]);

  useEffect(() => {
    selectedStateCities();
  }, [states, selectedState]);

  return { countries, states, cities };
};

export default useCountryCityState;
