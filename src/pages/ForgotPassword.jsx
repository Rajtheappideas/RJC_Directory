import React, { useState } from "react";
import SuccessModal from "../components/SuccessModal";

const ForgotPassword = () => {
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showResetPasswordBox, setShowResetPasswordBox] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <>
      {showSuccessModal && <SuccessModal />}
      <div className="w-screen overflow-y-auto grid lg:grid-cols-2 xl:gap-0 gap-5 place-items-center items-center h-screen">
        {/* images */}
        <div className="w-full relative lg:block hidden h-full">
          <img
            src={require("../assets/images/bgImage.png")}
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src={require("../assets/images/logoMain.png")}
            alt=""
            className="w-40 h-fit object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
          <img
            src={require("../assets/images/logoTitle.png")}
            alt=""
            className="w-40 h-fit object-cover absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
        </div>
        {!showResetPasswordBox ? (
          <>
            {/* form */}
            {!showOtpBox && (
              <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
                <img
                  src={require("../assets/images/bgImage.png")}
                  alt=""
                  className="w-full h-screen fixed lg:hidden -z-10 object-cover"
                />

                <div className="bg-white relative text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg">
                  <img
                    src={require("../assets/images/Logo.png")}
                    alt=""
                    className="w-fit h-fit object-cover lg:hidden absolute -top-16 left-1/2 -translate-x-1/2 z-10"
                  />
                  <p className="font-semibold  text-left text-2xl">
                    Forgot your password?
                  </p>
                  <p className="font-semibold  text-left text-base">
                    We'll help you reset it and get back on track.
                  </p>
                  <div className="space-y-1">
                    <label htmlFor="PhoneNumber" className="Label">
                      Phone number
                    </label>
                    <input type="text" className="input_field" />
                  </div>

                  <button className="green_button w-full">Submit</button>
                </div>
              </div>
            )}
            {/* otp box */}
            {showOtpBox && (
              <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
                <img
                  src={require("../assets/images/bgImage.png")}
                  alt=""
                  className="w-full h-screen fixed lg:hidden -z-10 object-cover"
                />

                <div className="bg-white relative text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg md:w-2/3 w-full">
                  <img
                    src={require("../assets/images/Logo.png")}
                    alt=""
                    className="w-fit h-fit object-cover lg:hidden absolute -top-16 left-1/2 -translate-x-1/2 z-10"
                  />
                  <p className="font-semibold  text-left text-2xl">
                    Continue to your account
                  </p>
                  <p className="font-medium text-left text-base opacity-50">
                    Enter the 4-digit code sent to you{" "}
                  </p>
                  <div className="flex w-full  items-center gap-2">
                    <input
                      type="text"
                      className="border border-borderColor w-1/6 rounded-lg p-3 outline-none focus:border-green-500"
                    />
                    <input
                      type="text"
                      className="border border-borderColor w-1/6 rounded-lg p-3 outline-none focus:border-green-500"
                    />
                    <input
                      type="text"
                      className="border border-borderColor w-1/6 rounded-lg p-3 outline-none focus:border-green-500"
                    />
                    <input
                      type="text"
                      className="border border-borderColor w-1/6 rounded-lg p-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <button className="green_button w-full">
                    Verify My Number
                  </button>

                  <div className="text-center">
                    <p className="text-xs">Resend code 0:57</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* form */}

            <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
              <img
                src={require("../assets/images/bgImage.png")}
                alt=""
                className="w-full h-full fixed lg:hidden -z-10 object-cover"
              />

              <div className="bg-white relative text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg">
                <img
                  src={require("../assets/images/Logo.png")}
                  alt=""
                  className="w-fit h-fit object-cover lg:hidden absolute -top-16 left-1/2 -translate-x-1/2 z-10"
                />
                <p className="font-semibold  text-left text-2xl">
                  Reset your password
                </p>
                <p className="font-semibold  text-left text-base">
                  <span className="text-blue-500">4561231854</span>{" "}
                  <span className="cursor-pointer">change</span>
                </p>
                <p className="font-semibold  text-left text-base">
                  We'll help you reset it and get back on track.
                </p>
                <div className="space-y-1">
                  <label htmlFor="password" className="Label">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="* * * * * *"
                    className="input_field text-center"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="confirm_password" className="Label">
                    re-type password
                  </label>
                  <input
                    type="password"
                    placeholder="* * * * * *"
                    className="input_field text-center"
                  />
                </div>

                <button className="green_button w-full">Change</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
