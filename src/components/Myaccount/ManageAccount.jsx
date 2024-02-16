import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCamera } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationSchema from "../../ValidationSchema";
import PhoneInput from "react-phone-input-2";
import { Country, State, City } from "country-state-city";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import moment from "moment";
import { handleEditProfile } from "../../redux/AuthSlice";
import toast from "react-hot-toast";
import BaseUrl from "../../BaseUrl";

const ManageAccount = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [states, setStates] = useState([]);

  const { user, loading, token } = useSelector((s) => s.root.auth);

  const { profileSchema } = ValidationSchema();
  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      city: user?.city,
      state: user?.state,
      country: user?.country,
      photo: user?.photo,
      dob: user?.dob?.split("T")[0],
      anniversary: user?.anniversary?.split("T")[0],
    },
  });

  const handleOnSubmit = (data) => {
    const { dob, anniversary, country, city, name } = data;

    const response = dispatch(
      handleEditProfile({
        dob,
        anniversary,
        country,
        city,
        name,
        image: profileImage,
        token,
        signal: AbortControllerRef,
      })
    );

    if (response) {
      response.then((res) => {
        if (res?.payload?.success) {
          toast.success("Profile edited successfully.");
        }
      });
    }
  };

  const selectedCountryStates = useCallback(() => {
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.name === getValues("country")
    );
    const states = State.getAllStates().filter(
      (state) => state?.countryCode === selectedCountry?.isoCode
    );
    setStates(states.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const selectedCountryCities = useCallback(() => {
    const selectedState = State.getAllStates().find(
      (c) => c.name === getValues("state")
    );
    const cities = City.getAllCities().filter(
      (city) => city?.stateCode === selectedState?.isoCode
    );
    setCities(cities.sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  useEffect(() => {
    setCountries(
      Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name))
    );

    return () => {
      abortApiCall();
    };
  }, []);

  useEffect(() => {
    selectedCountryStates();
    setCities([]);
  }, [watch("country")]);

  useEffect(() => {
    selectedCountryCities();
  }, [watch("state")]);

  let date = moment().format("L").split("/");
  let maxDate = date.splice(date.length - 1, 1);
  maxDate = maxDate.concat(date).join("-");

  var binaryData = [];
  binaryData.push(profileImage);
  const url = window.URL.createObjectURL(
    new Blob(binaryData, { type: "application/zip" })
  );

  return (
    <div className="lg:space-y-6 space-y-3">
      <p className="font-semibold text-2xl">Manage Account</p>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="w-full grid lg:grid-cols-2 gap-3"
      >
        <div
          className={`h-20 w-20 col-span-full cursor-pointer rounded-full border-[3px] ${
            profileImage === null ? "bg-gray-300" : "bg-gray-100"
          } border-blueColor relative`}
        >
          <div className="relative border-white border-4 w-full h-full rounded-full">
            {user?.photo && profileImage === null ? (
              <img
                src={BaseUrl.concat(user?.photo)}
                className="w-full rounded-full h-full object-cover absolute text-white top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
              />
            ) : profileImage !== null ? (
              <img
                src={url}
                className="w-full rounded-full h-full object-cover absolute text-white top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
              />
            ) : (
              <IoCamera className="w-6 h-6 absolute text-white top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2" />
            )}
            <input
              type="file"
              className="w-full h-full cursor-pointer opacity-0 absolute text-white top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
              {...register("photo", {
                onChange: (e) => {
                  setProfileImage(e.target.files[0]);
                },
              })}
              accept="image/*"
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="name" className="Label">
            Name
          </label>
          <input {...register("name")} type="text" className="input_field" />
          <span className="error">{errors?.name?.message}</span>
        </div>
        <div className="w-full">
          <label htmlFor="email" className="Label">
            Email id
          </label>
          <input
            disabled
            readOnly
            {...register("email")}
            type="email"
            className="input_field"
          />
          <span className="error">{errors?.email?.message}</span>
        </div>
        <div className="w-full">
          <label htmlFor="phone" className="Label">
            Phone number
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country={"in"}
                onChange={(value) => {
                  onChange((e) => {
                    setValue("phone", "+".concat(value));
                  });
                }}
                disableDropdown
                disableSearchIcon
                disabled
                value={getValues().phone}
                autocompleteSearch={true}
                countryCodeEditable={false}
                enableSearch={true}
                inputStyle={{
                  width: "100%",
                  padding: "24px 0 24px 50px",
                  borderRadius: "5px",
                  fontSize: "1rem",
                }}
                dropdownStyle={{
                  background: "white",
                  color: "#13216e",
                  fontWeight: "600",
                  padding: "0px 0px 0px 10px",
                }}
              />
            )}
          />
          <span className="error">{errors?.phone?.message}</span>
        </div>
        <div className="w-full">
          <label htmlFor="dob" className="Label">
            DOB
          </label>
          <input
            {...register("dob")}
            max={maxDate}
            type="date"
            className="input_field relative"
          />
          <span className="error">{errors?.dob?.message}</span>
        </div>
        <div className="w-full">
          <label htmlFor="anniversary" className="Label">
            Anniversary
          </label>
          <input
            {...register("anniversary")}
            type="date"
            className="input_field relative"
            max={maxDate}
          />
          <span className="error">{errors?.anniversary?.message}</span>
        </div>
        <div className="w-full ">
          <label htmlFor="country" className="Label">
            country
          </label>
          <select
            {...register("country")}
            name="country"
            id=""
            className="input_field"
          >
            <option label="select country"></option>
            {countries.map((country) => (
              <option
                selected={country?.name === user?.country}
                key={country?.name}
                value={country?.name}
              >
                {country?.name}
              </option>
            ))}
          </select>
          <span className="error">{errors?.country?.message}</span>
        </div>
        <div className="w-full ">
          <label htmlFor="state" className="Label">
            state
          </label>
          <select
            {...register("state")}
            name="state"
            id=""
            className="input_field"
          >
            <option label="select state"></option>
            {states.map((state) => (
              <option
                selected={state?.name === user?.state}
                key={state?.name}
                value={state?.name}
              >
                {state?.name}
              </option>
            ))}
          </select>
          <span className="error">{errors?.state?.message}</span>
        </div>
        <div className="w-full">
          <label htmlFor="city" className="Label">
            city
          </label>
          <select
            {...register("city")}
            name="city"
            id=""
            className="input_field"
          >
            <option label="select city"></option>
            {cities.map((city, i) => (
              <option
                selected={city?.name === user?.city}
                key={i}
                value={city?.name}
              >
                {city?.name}
              </option>
            ))}
          </select>
          <span className="error">{errors?.city?.message}</span>
        </div>
        <button type="submit" disabled={loading} className="green_button w-40">
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ManageAccount;
