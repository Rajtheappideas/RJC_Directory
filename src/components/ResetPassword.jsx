import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleResetPassword } from "../redux/AuthSlice";
import toast from "react-hot-toast";
import useAbortApiCall from "../hooks/useAbortApiCall";
import ValidationSchema from "../ValidationSchema";

const ResetPassword = ({ setShowSuccessModal }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { loading, token } = useSelector((s) => s.root.auth);

  const { ResetPasswordSchema } = ValidationSchema();

  const { AbortControllerRef } = useAbortApiCall();

  const dispatch = useDispatch();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleOnSubmit = (data) => {
    const { password, confirmPassword } = data;
    const response = dispatch(
      handleResetPassword({
        token,
        confirmPassword,
        password,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success) {
          toast.success(res?.payload?.message);
          setShowSuccessModal(true);
        }
      });
    }
  };

  return (
    <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
      <img
        src={require("../assets/images/bgImage.png")}
        alt=""
        className="w-full h-full fixed lg:hidden -z-10 object-cover"
      />
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="bg-white relative xl:w-2/3 lg:w-full md:w-1/2 lg:mt-0 mt-14  text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg"
      >
        <div className="lg:hidden absolute -top-16 left-1/2 -translate-x-1/2 z-10">
          <Link to="/">
            <img
              src={require("../assets/images/Logo.png")}
              alt=""
              className="w-fit h-fit object-cover "
            />
          </Link>
        </div>
        <p className="font-semibold  text-left text-2xl">Reset your password</p>
        <p className="font-semibold  text-left text-base text-textColor text-opacity-50">
          Set your new password
        </p>

        <div className="space-y-1 relative">
          <label htmlFor="password" className="Label ">
            password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="* * * * * *"
            className="input_field"
            {...register("password")}
          />
          <span
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute cursor-pointer w-fit hover:bg-gray-100 p-1 select-none top-9 right-3 font-light text-base"
          >
            {showNewPassword ? "Hide" : "Show"}
          </span>
          <span className="error">{errors?.password?.message}</span>
        </div>
        <div className="space-y-1">
          <label htmlFor="confirm_password" className="Label">
            re-type password
          </label>
          <input
            type="password"
            placeholder="* * * * * *"
            className="input_field"
            {...register("confirmPassword")}
          />
          <span className="error">{errors?.confirmPassword?.message}</span>
        </div>

        <button disabled={loading} className="green_button w-full">
          {loading ? "Changing..." : "Change"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
