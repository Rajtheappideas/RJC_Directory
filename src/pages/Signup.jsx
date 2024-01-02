import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import SetYourPreference from "../components/Signup/SetYourPreference";
import SuccessModal from "../components/Signup/SuccessModal";

const Signup = () => {
  const [showPreferenceBox, setShowPreferenceBox] = useState(false);

  return (
    <>
    {/* <SuccessModal/> */}
      {showPreferenceBox && <SetYourPreference />}
      <div className="w-screen overflow-y-auto grid xl:grid-cols-2 xl:gap-0 gap-5 place-items-center items-center h-screen">
        {/* images */}
        <div className="w-full h-full relative xl:block hidden">
          <img
            src={require("../assets/images/bgImage.png")}
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src={require("../assets/images/logoMain.png")}
            alt=""
            className="w-40 h-fit object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          />
          <img
            src={require("../assets/images/logoTitle.png")}
            alt=""
            className="w-40 h-fit object-cover absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          />
        </div>
        {/* form */}
        <div className="xl:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
          <img
            src={require("../assets/images/bgImage.png")}
            alt=""
            className="w-full h-full fixed xl:hidden -z-10 object-cover  top-0 left-0"
          />

          <div className="bg-white relative text-[#000D23] space-y-4 xl:mt-0 mt-14 rounded-lg md:p-10 p-4 shadow-lg md:w-2/3 w-full">
            <img
              src={require("../assets/images/Logo.png")}
              alt=""
              className="w-fit h-fit object-cover xl:hidden absolute -top-14 left-1/2 -translate-x-1/2 z-10"
            />
            <p className="font-semibold  text-left text-2xl">Sign up</p>
            <div className="space-y-1">
              <label htmlFor="Name" className="Label">
                Name
              </label>
              <input type="text" className="input_field" />
            </div>
            <div className="space-y-1">
              <label htmlFor="Email" className="Label">
                Email
              </label>
              <input type="email" className="input_field" />
            </div>
            <div className="space-y-1">
              <label htmlFor="PhoneNumber" className="Label">
                Phone Number
              </label>
              <input type="text" className="input_field" />
            </div>
            <div className="space-y-1">
              <label htmlFor="dob" className="Label">
                Date of birth
              </label>
              <input type="date" className="input_field" />
            </div>
            <div className="flex items-center gap-2">
              <div className="space-y-1 w-1/2">
                <label htmlFor="country" className="Label">
                  Country
                </label>
                <select name="country" id="" className="input_field">
                  <option value="india">india</option>
                  <option value="india">india</option>
                  <option value="india">india</option>
                </select>
              </div>
              <div className="space-y-1 w-1/2">
                <label htmlFor="city" className="Label">
                  city
                </label>
                <select name="city" id="" className="input_field">
                  <option value="ahmedabad">ahmedabad</option>
                  <option value="ahmedabad">ahmedabad</option>
                  <option value="ahmedabad">ahmedabad</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-full flex items-center justify-between">
                <label htmlFor="password" className="Label">
                  Password
                </label>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="input_field"
              />
            </div>
            <p className="opacity-50">
              8 characters with a mix of letters, numbers & symbols
            </p>
            <p className="opacity-50 flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5 rounded-lg" /> I agree
              and accept the{" "}
              <Link
                to="/terms"
                className="text-green-500 font-semibold underline opacity-100"
              >
                Terms & Conditions.
              </Link>
            </p>
            <button className="green_button w-full">Sign up</button>

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
            <p className=" text-sm text-center">
              Don’t have an account?{" "}
              <Link
                to="/sign-in"
                className="text-blue-500 font-semibold text-base opacity-100"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
