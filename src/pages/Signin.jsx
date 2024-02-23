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
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      toast.remove();
      toast.error("phone is invalid");
      return true;
    }
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
      <div className="w-screen overflow-y-auto grid lg:grid-cols-2 xl:gap-0 gap-5 place-items-center items-center h-screen">
        {/* images */}
        <div className="w-full relative lg:block hidden">
          <img
            src={require("../assets/images/bgImage.png")}
            alt=""
            className="w-full xl:h-screen h-full object-cover"
            loading="lazy"
          />
          <Link
            to="/"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 space-y-4"
          >
            <img
              src={require("../assets/images/logoMain.png")}
              alt=""
              className="xl:w-40  w-32 h-fit object-cover"
              loading="lazy"
            />
            <img
              src={require("../assets/images/logoTitle.png")}
              alt=""
              className="xl:w-40  w-32 h-fit object-cover "
              loading="lazy"
            />
          </Link>
        </div>
        {/* form */}
        {!showOtpBox ? (
          <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
            <img
              src={require("../assets/images/bgImage.png")}
              alt=""
              className="w-full h-screen -top-2 fixed lg:hidden -z-10 object-cover"
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
                  className="w-fit h-fit object-cover lg:hidden absolute -top-16 left-1/2 -translate-x-1/2 z-10"
                />
              </Link>
              <p className="font-semibold  text-left text-2xl">Sign In</p>
              <div className="space-y-1">
                <label htmlFor="PhoneNumber" className="Label">
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
              {signInWithPassword && (
                <div className="space-y-1 relative">
                  <div className="w-full flex items-center justify-between">
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
              )}

              <button disabled={loading} className="green_button w-full">
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <p
                onClick={() => setSignInWithPassword(!signInWithPassword)}
                className="text-center text-lg cursor-pointer font-semibold"
              >
                {!signInWithPassword
                  ? "Sign In with Password"
                  : " Sign In with OTP"}
              </p>
              <div className="flex items-center gap-2 opacity-50 w-full whitespace-nowrap">
                <hr className="flex-1" />
                <p className=" text-[10px] flex-1 font-semibold tracking-widest">
                  OR SIGN-IN WITH
                </p>
                <hr className="flex-1" />
              </div>
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
              <p className="text-base text-center text-textColor text-opacity-50">
                Don’t have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-blue-500 underline underline-offset-4 font-semibold text-base opacity-100"
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
