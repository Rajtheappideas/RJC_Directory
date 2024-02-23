import React, { useCallback, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SetYourPreference from "../components/Signup/SetYourPreference";
import SuccessModal from "../components/Signup/SuccessModal";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../hooks/useAbortApiCall";
import ValidationSchema from "../ValidationSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import { handleRegister } from "../redux/AuthSlice";
import PhoneInput from "react-phone-input-2";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Country, State, City } from "country-state-city";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import { fromAddress, setDefaults, setKey } from "react-geocode";

const Signup = () => {
  const [showPreferenceBox, setShowPreferenceBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [states, setStates] = useState([]);

  const { loading, user, fcmToken } = useSelector((state) => state.root.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const { signupSchema } = ValidationSchema();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(signupSchema),
    defaultValues: { cityLatitude: "", cityLongitude: "" },
  });

  const onSubmit = (data) => {
    const { phone } = data;
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      toast.remove();
      toast.error("phone is invalid");
      return true;
    } else if (
      (getValues("mobile") !== "" && !isPossiblePhoneNumber(phone)) ||
      !isValidPhoneNumber(phone)
    ) {
      toast.remove();
      toast.error("phone is invalid");
      return true;
    }

    const response = dispatch(
      handleRegister({
        data,
        fcmToken,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success) {
          setShowPreferenceBox(true);
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

  // const getCityLangAndLat = useCallback(() => {
  //   if (watch("city") === "") return;
  //   fromAddress(getValues("city")).then((res) => {
  //     const city = { ...res?.results[0] };
  //     if (city) {
  //       setValue("cityLatitude", city?.geometry?.location?.lat);
  //       setValue("cityLongitude", city?.geometry?.location?.lng);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setCountries(
      Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name))
    );

    // setDefaults({ key: process.env.REACT_APP_GOOGLE_API_KEY, language: "en" });
    // setKey(process.env.REACT_APP_GOOGLE_API_KEY);

    return () => {
      abortApiCall();
    };
  }, []);

  useEffect(() => {
    selectedCountryStates();
    setCities([]);
    setValue("city", "");
  }, [watch("country")]);

  useEffect(() => {
    selectedCountryCities();
  }, [watch("state")]);

  // useEffect(() => {
  //   getCityLangAndLat();
  // }, [watch("city"), cities]);

  let date = moment().format("L").split("/");
  let maxDate = date.splice(date.length - 1, 1);
  maxDate = maxDate.concat(date).join("-");

  useEffect(() => {
    if (user !== null) navigate("/");
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Sign up - RJC Directory</title>
      </Helmet>
      {showSuccess && <SuccessModal />}
      {showPreferenceBox ? (
        <SetYourPreference setShowSuccess={setShowSuccess} />
      ) : (
        <div className="w-screen overflow-y-auto grid xl:grid-cols-2 xl:gap-0 gap-5 place-items-center items-center h-screen">
          {/* images */}
          <div className="w-full h-full relative xl:block hidden">
            <img
              src={require("../assets/images/bgImage.png")}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <Link
              to="/"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 space-y-4"
            >
              <img
                src={require("../assets/images/logoMain.png")}
                alt=""
                className="w-40 h-fit object-cover"
                loading="lazy"
              />
              <img
                src={require("../assets/images/logoTitle.png")}
                alt=""
                className="w-40 h-fit object-cover "
                loading="lazy"
              />
            </Link>
          </div>
          {/* form */}
          <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
            <img
              src={require("../assets/images/bgImage.png")}
              alt=""
              className="w-full h-screen fixed lg:hidden -z-10 object-cover"
              loading="lazy"
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white relative text-[#000D23] space-y-4 xl:mt-0 mt-14 rounded-lg md:p-10 p-4 shadow-lg md:w-2/3 w-full"
            >
              <Link to="/">
                <img
                  src={require("../assets/images/Logo.png")}
                  alt=""
                  className="w-fit h-fit object-cover lg:hidden absolute -top-16 left-1/2 -translate-x-1/2 z-10"
                />
              </Link>
              <p className="font-semibold  text-left text-2xl">Sign Up</p>
              <div className="space-y-1">
                <label htmlFor="Name" className="Label">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="input_field"
                />
                <span className="error">{errors?.name?.message}</span>
              </div>
              <div className="space-y-1">
                <label htmlFor="Email" className="Label">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="input_field"
                />
                <span className="error">{errors?.email?.message}</span>
              </div>
              <div className="space-y-1">
                <label htmlFor="PhoneNumber" className="Label">
                  Phone Number
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
              <div className="space-y-1">
                <label htmlFor="dob" className="Label">
                  Date of birth
                </label>
                <input
                  type="date"
                  {...register("dob")}
                  className="input_field relative"
                  max={maxDate}
                />
                <span className="error">{errors?.dob?.message}</span>
              </div>
              <div className="space-y-1">
                <label htmlFor="anniversary" className="Label">
                  Anniversary (Optional)
                </label>
                <input
                  type="date"
                  {...register("anniversary")}
                  className="input_field relative"
                  max={maxDate}
                />
                <span className="error">{errors?.anniversary?.message}</span>
              </div>
              <div className="space-y-1 w-full">
                <label htmlFor="country" className="Label">
                  Country
                </label>
                <select
                  {...register("country")}
                  name="country"
                  id=""
                  className="input_field"
                >
                  <option label="select country"></option>
                  {countries.map((country) => (
                    <option key={country?.name} value={country?.name}>
                      {country?.name}
                    </option>
                  ))}
                </select>
                <span className="error">{errors?.country?.message}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="space-y-1 w-1/2">
                  <label htmlFor="state" className="Label">
                    State
                  </label>
                  <select
                    {...register("state")}
                    name="state"
                    id=""
                    className="input_field"
                  >
                    <option label="select state"></option>
                    {states.map((state) => (
                      <option key={state?.name} value={state?.name}>
                        {state?.name}
                      </option>
                    ))}
                  </select>
                  <span className="error">{errors?.state?.message}</span>
                </div>
                <div className="space-y-1 w-1/2">
                  <label htmlFor="city" className="Label">
                    City
                  </label>
                  <select
                    {...register("city")}
                    name="city"
                    id=""
                    className="input_field"
                  >
                    <option label="select city"></option>
                    {cities.map((city, i) => (
                      <option key={i} value={city?.name}>
                        {city?.name}
                      </option>
                    ))}
                  </select>
                  <span className="error">{errors?.city?.message}</span>
                </div>
              </div>

              <div className="space-y-1 relative">
                <div className="w-full flex items-center justify-between">
                  <label htmlFor="password" className="Label">
                    Password
                  </label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input_field"
                  {...register("password")}
                />
                {showPassword ? (
                  <IoMdEye
                    onClick={() => setShowPassword(false)}
                    className="absolute top-9 right-3 h-6 w-6 cursor-pointer"
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={() => setShowPassword(true)}
                    className="absolute top-9 right-3 h-6 w-6 cursor-pointer"
                  />
                )}
                <span className="error">{errors?.password?.message}</span>
              </div>
              <p className="opacity-50">
                8 characters with a mix of letters, numbers & symbols
              </p>
              <div className="space-y-1 ">
                <div className="w-full flex items-center justify-between">
                  <label htmlFor="confirmPassword" className="Label">
                    Confirm Password
                  </label>
                </div>
                <input
                  type="password"
                  placeholder="Enter your confirm password"
                  className="input_field"
                  {...register("confirmPassword")}
                />
                <span className="error">
                  {errors?.confirmPassword?.message}
                </span>
              </div>
              <p className="opacity-50 flex items-center gap-2">
                <input
                  {...register("checkbox")}
                  id="checkbox"
                  type="checkbox"
                  className="w-5 h-5 rounded-lg"
                />{" "}
                <label htmlFor="checkbox" className="cursor-default">
                  I agree and accept the{" "}
                </label>
                <Link
                  to="/terms"
                  className="text-green-500 font-semibold underline opacity-100"
                >
                  Terms & Conditions.
                </Link>
              </p>
              <span className="error">{errors?.checkbox?.message}</span>
              <button
                type="submit"
                disabled={loading}
                className="green_button w-full"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
              {/* {error && (
                <p className="text-red-500 font-semibold">{error?.message}</p>
              )} */}
              {/* social login */}
              <div className="w-full flex items-center justify-center gap-2">
                <button
                  disabled={loading}
                  className="rounded-full w-12 h-12 border text-center"
                >
                  <FcGoogle className="text-xl mx-auto" />
                </button>
                {/* <button className="rounded-full w-12 h-12 border text-center">
                  <FaFacebookF className="text-xl mx-auto text-blue-500" />
                </button> */}
              </div>
              {/* sign up  url */}
              <p className=" text-base text-opacity-50 text-textColor text-center">
                Don’t have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-blue-500 underline underline-offset-4 font-semibold text-base opacity-100"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
