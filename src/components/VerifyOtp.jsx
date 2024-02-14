import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  handleGetSigninOTP,
  handleVerifyOtp,
  handleVerifySigninOTP,
} from "../redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../hooks/useAbortApiCall";
import { PostUrl } from "../BaseUrl";
import { useNavigate } from "react-router-dom";

const VerifyOtp = ({ phone, setShowResetPasswordBox, from, setShowOtpBox }) => {
  const [numberField, setNumberField] = useState({
    stepOne: "",
    stepTwo: "",
    stepThree: "",
    stepFour: "",
  });
  const [resentOtpLoading, setResentOtpLoading] = useState(false);

  const { loading } = useSelector((s) => s.root.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { AbortControllerRef } = useAbortApiCall();

  const handleOnChange = (value, e) => {
    setNumberField({ ...numberField, [value]: e });
  };

  const handleInputFocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < 4) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const resetValues = () => {
    setNumberField({
      stepOne: "",
      stepTwo: "",
      stepThree: "",
      stepFour: "",
    });
  };

  const handleSubmitVerfiyOtp = (e) => {
    e.preventDefault();
    if (Object.values(numberField).includes("")) {
      toast.remove();
      toast.error("please fill all the fields");
      for (const key in numberField) {
        if (numberField.hasOwnProperty(key)) {
          const element = numberField[key];
          if (element === "") {
            document.getElementById(key).focus();
            break;
          }
        }
      }
      return true;
    }

    if (from === "sign_in") {
      const response = dispatch(
        handleVerifySigninOTP({
          phone,
          otp: Object.values(numberField).join(""),
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success) {
            toast.success("OTP verified successfully", { duration: 2000 });
            resetValues();
            navigate("/");
          } else if (!res?.payload?.success) {
            resetValues();
          }
        });
      }
    } else {
      const response = dispatch(
        handleVerifyOtp({
          phone,
          otp: Object.values(numberField).join(""),
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success) {
            toast.success("OTP verified successfully", { duration: 2000 });
            resetValues();
            setShowResetPasswordBox(true);
          } else if (!res?.payload?.success) {
            resetValues();
          }
        });
      }
    }
  };

  const handleResendOtp = async () => {
    setResentOtpLoading(true);
    try {
      toast.loading("Sending...");
      const formdata = new FormData();
      formdata.append("phone", phone);
      if (from !== "sign_in") {
        const { data } = await PostUrl("forgot-password", {
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data) {
          setResentOtpLoading(false);
          toast.remove();
          if (data?.success) {
            toast.success("OTP sent successfully.");
          }
        }
      } else {
        const { data } = await PostUrl("send-otp", {
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data) {
          setResentOtpLoading(false);
          toast.remove();
          if (data?.success) {
            toast.success("OTP sent successfully.");
          }
        }
        // const response = dispatch(
        //   handleGetSigninOTP({
        //     phone,
        //     signal: AbortControllerRef,
        //   })
        // );
        // if (response) {
        //   response.then((res) => {
        //     if (res?.payload?.success) {
        //       toast.success(res?.payload?.message);
        //       setShowOtpBox(true);
        //     }
        //   });
        // }
      }
    } catch (error) {
      toast.remove();
      toast.error(error?.response?.data?.message);
      setResentOtpLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitVerfiyOtp}
      className="bg-white relative text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg md:w-2/3 w-full"
    >
      <img
        src={require("../assets/images/Logo.png")}
        alt=""
        className="w-fit h-fit object-cover lg:hidden absolute -top-16 left-1/2 -translate-x-1/2 z-10"
      />
      <p className="font-semibold  text-left text-2xl">
        Continue to your account
        <span className="block font-semibold text-base text-textColor text-opacity-50">
          Check your phone for the OTP
        </span>
      </p>
      <p className="font-medium text-left text-base opacity-50">
        Enter the 4-digit code sent to you{" "}
      </p>
      <div className="flex w-full  items-center gap-2">
        <input
          type="number"
          className="border border-borderColor text-center font-semibold w-[14%] rounded-lg p-3 outline-none focus:border-green-500"
          onChange={(e) => {
            handleOnChange(
              "stepOne",
              e.target.value.length > 1
                ? e.target.value.slice(-1)
                : e.target.value.trim()
            );
          }}
          value={numberField?.stepOne}
          onKeyUp={(e) => handleInputFocus(e)}
          autoComplete="off"
          tabIndex="1"
          min="0"
          max="9"
          maxLength="1"
          name="stepOne"
          id="stepOne"
        />
        <input
          type="number"
          className="border border-borderColor text-center font-semibold w-[14%] rounded-lg p-3 outline-none focus:border-green-500"
          onChange={(e) => {
            handleOnChange(
              "stepTwo",
              e.target.value.length > 1
                ? e.target.value.slice(-1)
                : e.target.value.trim()
            );
          }}
          value={numberField?.stepTwo}
          onKeyUp={(e) => handleInputFocus(e)}
          autoComplete="off"
          tabIndex="2"
          min="0"
          max="9"
          maxLength="1"
          name="stepTwo"
          id="stepTwo"
        />
        <input
          type="number"
          className="border border-borderColor text-center font-semibold w-[14%] rounded-lg p-3 outline-none focus:border-green-500"
          onChange={(e) => {
            handleOnChange(
              "stepThree",
              e.target.value.length > 1
                ? e.target.value.slice(-1)
                : e.target.value.trim()
            );
          }}
          value={numberField?.stepThree}
          onKeyUp={(e) => handleInputFocus(e)}
          autoComplete="off"
          tabIndex="3"
          min="0"
          max="9"
          maxLength="1"
          name="stepThree"
          id="stepThree"
        />
        <input
          type="number"
          className="border border-borderColor text-center font-semibold w-[14%] rounded-lg p-3 outline-none focus:border-green-500"
          onChange={(e) => {
            handleOnChange(
              "stepFour",
              e.target.value.length > 1
                ? e.target.value.slice(-1)
                : e.target.value.trim()
            );
          }}
          value={numberField?.stepFour}
          onKeyUp={(e) => handleInputFocus(e)}
          autoComplete="off"
          tabIndex="4"
          min="0"
          max="9"
          maxLength="1"
          name="stepFour"
          id="stepFour"
        />
      </div>
      <div className="space-y-2">
        <button
          disabled={loading || resentOtpLoading}
          className="green_button w-full"
          type="submit"
        >
          {loading ? "Verifying..." : "Verify My Number"}
        </button>
        <button
          disabled={loading || resentOtpLoading}
          className="blue_button w-full"
          type="button"
          onClick={() => {
            setShowOtpBox(false);
            from == "forgot_password" && navigate("/sign-in");
          }}
        >
          Go to Login
        </button>
      </div>

      <div className="text-center">
        <button
          disabled={loading || resentOtpLoading}
          className="text-base underline text-blue-500 cursor-pointer text-opacity-50"
          onClick={handleResendOtp}
          type="button"
        >
          Resend code
        </button>
      </div>
    </form>
  );
};

export default VerifyOtp;
