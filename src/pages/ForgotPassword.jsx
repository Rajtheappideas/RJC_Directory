import React, { useEffect, useState } from "react";
import SuccessModal from "../components/SuccessModal";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationSchema from "../ValidationSchema";
import PhoneInput from "react-phone-input-2";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { handleForgotPassword, handleVerifyOtp } from "../redux/AuthSlice";
import useAbortApiCall from "../hooks/useAbortApiCall";
import ResetPassword from "../components/ResetPassword";
import { PostUrl } from "../BaseUrl";
import VerifyOtp from "../components/VerifyOtp";
import "react-phone-input-2/lib/style.css";

const ForgotPassword = () => {
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showResetPasswordBox, setShowResetPasswordBox] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { loading } = useSelector((s) => s.root.auth);

  const { forgotPasswordSchema } = ValidationSchema();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();

  const {
    formState: { errors },
    handleSubmit,
    getValues,
    control,
    setValue,
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { phone: "+912084422881" },
  });

  const OnSubmitForgotPassword = (data) => {
    if (
      !isPossiblePhoneNumber(data?.phone) ||
      !isValidPhoneNumber(data?.phone)
    ) {
      toast.remove();
      toast.error("phone is invalid");
      return true;
    }

    const response = dispatch(
      handleForgotPassword({ phone: data?.phone, signal: AbortControllerRef })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          setShowOtpBox(true);
        }
      });
    }
  };

  useEffect(() => {
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Forgot password - RJC Directory</title>
      </Helmet>
      {showSuccessModal && (
        <SuccessModal setShowSuccessModal={setShowSuccessModal} />
      )}
      <div className="w-screen overflow-y-auto grid lg:grid-cols-2 xl:gap-0 gap-5 place-items-center items-center h-screen">
        {/* images */}
        <div className="w-full relative lg:block hidden h-full">
          <img
            src={require("../assets/images/bgImage.png")}
            alt=""
            className="w-full h-screen object-cover"
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
        {!showResetPasswordBox ? (
          <>
            {/* otp box */}
            {showOtpBox ? (
              <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
                <img
                  src={require("../assets/images/bgImage.png")}
                  alt=""
                  className="w-full h-screen fixed lg:hidden -z-10 object-cover"
                />
                <VerifyOtp
                  phone={getValues().phone}
                  setShowResetPasswordBox={setShowResetPasswordBox}
                  from="forgot_password"
                  setShowOtpBox={setShowOtpBox}
                />
              </div>
            ) : (
              <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
                <img
                  src={require("../assets/images/bgImage.png")}
                  alt=""
                  className="w-full h-screen fixed lg:hidden -z-10 object-cover"
                />

                <form
                  onSubmit={handleSubmit(OnSubmitForgotPassword)}
                  className="bg-white relative text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg"
                >
                  <img
                    src={require("../assets/images/Logo.png")}
                    alt=""
                    className="w-fit h-fit object-cover lg:hidden absolute -top-16 left-1/2 -translate-x-1/2 z-10"
                  />
                  <p className="font-semibold  text-left text-2xl">
                    Forgot your password?
                    <span className="font-semibold block  text-left text-base text-textColor text-opacity-50">
                      We'll help you reset it and get back on track.
                    </span>
                  </p>
                  <div className="space-y-1">
                    <label htmlFor="PhoneNumber" className="Label">
                      Phone number
                    </label>
                    {/* <input type="text" className="input_field" /> */}
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
                  <div className="space-y-2">
                    <button
                      disabled={loading}
                      type="submit"
                      className="green_button w-full"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      disabled={loading}
                      type="button"
                      className="blue_button w-full"
                      onClick={() => navigate("/sign-in")}
                    >
                      Go to Login
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        ) : (
          <ResetPassword setShowSuccessModal={setShowSuccessModal} />
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
