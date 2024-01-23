import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
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

const Signup = () => {
  const [showPreferenceBox, setShowPreferenceBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.root.auth);

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
    defaultValues: { fcmToken: "test" },
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

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    const selectedCountry = Country.getAllCountries().find(
      (c) => c.name === getValues("country")
    );
    const cities = City.getAllCities().filter(
      (city) => city?.countryCode === selectedCountry?.isoCode
    );
    setCities(cities);
  }, [watch("country")]);

  return (
    <>
      <Helmet>
        <title>Sign up - RJC Directory</title>
      </Helmet>
      {showSuccess && <SuccessModal />}
      {!showPreferenceBox ? (
        <SetYourPreference setShowSuccess={setShowSuccess} />
      ) : (
        <div className="w-screen overflow-y-auto grid xl:grid-cols-2 xl:gap-0 gap-5 place-items-center items-center h-screen">
          {/* images */}
          <div className="w-full h-full relative xl:block hidden">
            <img
              src={require("../assets/images/bgImage.png")}
              alt=""
              className="w-full h-full object-cover"
            />
            <Link
              to="/"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 space-y-4"
            >
              <img
                src={require("../assets/images/logoMain.png")}
                alt=""
                className="w-40 h-fit object-cover"
              />
              <img
                src={require("../assets/images/logoTitle.png")}
                alt=""
                className="w-40 h-fit object-cover "
              />
            </Link>
          </div>
          {/* form */}
          <div className="xl:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
            <img
              src={require("../assets/images/bgImage.png")}
              alt=""
              className="w-full h-full fixed xl:hidden -z-10 object-cover  top-0 left-0"
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
                        padding: "22px 0 22px 50px",
                        borderRadius: "5px",
                        fontSize: "1rem",
                      }}
                      buttonStyle={{ background: "white" }}
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
                  className="input_field"
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
                  className="input_field"
                />
                <span className="error">{errors?.anniversary?.message}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="space-y-1 w-1/2">
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
                <button className="rounded-full w-12 h-12 border text-center">
                  <FcGoogle className="text-xl mx-auto" />
                </button>
                <button className="rounded-full w-12 h-12 border text-center">
                  <FaFacebookF className="text-xl mx-auto text-blue-500" />
                </button>
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
