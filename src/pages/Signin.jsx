import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationSchema from "../ValidationSchema";
import useAbortApiCall from "../hooks/useAbortApiCall";
import {
  handleChangeFcmToken,
  handleGetPreference,
  handleGetSigninOTP,
  handleSignin,
} from "../redux/AuthSlice";
import PhoneInput from "react-phone-input-2";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import VerifyOtp from "../components/VerifyOtp";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { GetToken } from "../Firebase/firebase-messaging-sw";

const Signin = () => {
  const [signInWithPassword, setSignInWithPassword] = useState(true);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);
  const [fcmLoading, setFcmLoading] = useState(false);

  const { user, loading, fcmToken: FCM } = useSelector((s) => s.root.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const { signInSchema } = ValidationSchema(signInWithPassword);

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data) => {
    const { phone, password } = data;
    // if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
    //   toast.remove();
    //   toast.error("phone is invalid");
    //   return true;
    // }
    if (!signInWithPassword) {
      const response = dispatch(
        handleGetSigninOTP({
          phone,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success) {
            toast.success(res?.payload?.message);
            setShowOtpBox(true);
          }
        });
      }
    } else {
      const response = dispatch(
        handleSignin({
          phone,
          password,
          fcmToken: FCM,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success) {
            navigate(-1);
            window.scrollTo({ top: 0, behavior: "smooth" });
            dispatch(handleGetPreference({ token: res?.payload?.token }));
          }
        });
      }
    }
  };

  const handleSetFcmToken = () => {
    if (FCM !== null) {
      return;
    } else if (fcmToken !== null && FCM === null) {
      return dispatch(handleChangeFcmToken(fcmToken));
    }
    if (window.Notification.permission !== "granted") {
      toast.remove();
      window.Notification.requestPermission();
    }
    if (fcmToken === null) {
      return GetToken(setFcmToken, setFcmLoading);
    }
  };

  useEffect(() => {
    handleSetFcmToken();
  }, [fcmLoading]);

  useEffect(() => {
    if (user !== null) navigate("/");
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Sign in - RJC Directory</title>
      </Helmet>
      <div className="grid items-center w-screen h-screen gap-5 overflow-y-auto lg:grid-cols-2 xl:gap-0 place-items-center">
        {/* images */}
        <div className="relative hidden w-full lg:block">
          <img
            src={require("../assets/images/bgImage.png")}
            alt=""
            className="object-cover w-full h-full xl:h-screen"
            loading="lazy"
          />
          <Link
            to="/"
            className="absolute z-10 space-y-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          >
            <img
              src={require("../assets/images/logoMain.png")}
              alt=""
              className="object-cover w-32 xl:w-40 h-fit"
              loading="lazy"
            />
            <img
              src={require("../assets/images/logoTitle.png")}
              alt=""
              className="object-cover w-32 xl:w-40 h-fit "
              loading="lazy"
            />
          </Link>
        </div>
        {/* form */}
        {!showOtpBox ? (
          <div className="relative z-0 flex items-center justify-center w-screen h-full p-3 lg:w-full bg-bgGray">
            <img
              src={require("../assets/images/bgImage.png")}
              alt=""
              className="fixed object-cover w-full h-screen -top-2 lg:hidden -z-10"
              loading="lazy"
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white relative text-[#000D23] space-y-4 lg:mt-0 mt-14 rounded-lg md:p-10 p-4 shadow-lg xl:w-8/12 lg:w-10/12 md:w-2/3 w-full"
            >
              <Link to="/">
                <img
                  src={require("../assets/images/Logo.png")}
                  alt=""
                  className="absolute z-10 object-cover -translate-x-1/2 w-fit h-fit lg:hidden -top-16 left-1/2"
                />
              </Link>
              <p className="text-2xl font-semibold text-left">Sign In</p>
              <div className="space-y-1">
                <label htmlFor="PhoneNumber" className="Label">
                  Phone number
                </label>
                {/* <Controller
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
                /> */}
                <input
                  type="number"
                  {...register("phone")}
                  className="input_field"
                  placeholder="Enter your Phone number"
                />
                <span className="error">{errors?.phone?.message}</span>
              </div>
              {signInWithPassword && (
                <div className="relative space-y-1">
                  <div className="flex items-center justify-between w-full">
                    <label htmlFor="password" className="Label">
                      Password
                    </label>
                    <Link className="Label" to="/forgot-password">
                      Forgot your password?
                    </Link>
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
                      className="absolute w-6 h-6 cursor-pointer top-9 right-3"
                    />
                  ) : (
                    <IoMdEyeOff
                      onClick={() => setShowPassword(true)}
                      className="absolute w-6 h-6 cursor-pointer top-9 right-3"
                    />
                  )}
                  <span className="error">{errors?.password?.message}</span>
                </div>
              )}

              <button disabled={loading} className="w-full green_button">
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <p
                onClick={() => setSignInWithPassword(!signInWithPassword)}
                className="text-lg font-semibold text-center cursor-pointer"
              >
                {!signInWithPassword
                  ? "Sign In with Password"
                  : " Sign In with OTP"}
              </p>
              <div className="flex items-center w-full gap-2 opacity-50 whitespace-nowrap">
                <hr className="flex-1" />
                <p className=" text-[10px] flex-1 font-semibold tracking-widest">
                  OR SIGN-IN WITH
                </p>
                <hr className="flex-1" />
              </div>
              {/* social login */}
              <div className="flex items-center justify-center w-full gap-2">
                <button
                  disabled={loading}
                  className="w-12 h-12 text-center border rounded-full"
                >
                  <FcGoogle className="mx-auto text-xl" />
                </button>
                {/* <button className="w-12 h-12 text-center border rounded-full">
                  <FaFacebookF className="mx-auto text-xl text-blue-500" />
                </button> */}
              </div>
              {/* sign up  url */}
              <p className="text-base text-center text-opacity-50 text-textColor">
                Don’t have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-base font-semibold text-blue-500 underline opacity-100 underline-offset-4"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        ) : (
          <VerifyOtp
            phone={getValues().phone}
            setShowOtpBox={setShowOtpBox}
            from="sign_in"
          />
        )}
      </div>
    </>
  );
};

export default Signin;
