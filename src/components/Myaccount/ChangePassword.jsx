import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationSchema from "../../ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import { handleChangePassword, handleLogout } from "../../redux/AuthSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, token } = useSelector((s) => s.root.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { changePasswordSchema } = ValidationSchema();

  const { AbortControllerRef } = useAbortApiCall();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(changePasswordSchema),
  });

  const handleOnSubmit = (data) => {
    const { password, newPassword, confirmPassword } = data;
    const response = dispatch(
      handleChangePassword({
        token,
        confirmPassword,
        newPassword,
        password,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success) {
          toast.success("Password change successfully.");
          dispatch(handleLogout());
          navigate("/sign-in");
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="lg:space-y-6 space-y-3"
    >
      <p className="font-semibold text-2xl">Change Password</p>
      <div className="space-y-1 w-1/2 relative">
        <label htmlFor="currentPassword" className="Label">
          Current password*
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="type here..."
          className="input_field"
          {...register("password")}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute cursor-pointer top-8 rounded-lg right-3 bg-gray-100 p-1"
        >
          {showPassword ? "Hide" : "Show"}
        </span>
        <span className="error">{errors?.password?.message}</span>
      </div>
      <div className="space-y-1 w-1/2 relative">
        <label htmlFor="newPassword" className="Label">
          new password*
        </label>
        <input
          type={showNewPassword ? "text" : "password"}
          placeholder="type here..."
          className="input_field"
          {...register("newPassword")}
        />{" "}
        <span
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute cursor-pointer top-8 rounded-lg right-3 bg-gray-100 p-1"
        >
          {showNewPassword ? "Hide" : "Show"}
        </span>
        <span className="error">{errors?.newPassword?.message}</span>
      </div>

      <div className="space-y-1 w-1/2 relative">
        <label htmlFor="confirmPassword" className="Label">
          confirm password*
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="type here..."
          {...register("confirmPassword")}
          className="input_field"
        />{" "}
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute cursor-pointer top-8 rounded-lg right-3 bg-gray-100 p-1"
        >
          {showConfirmPassword ? "Hide" : "Show"}
        </span>
        <span className="error">{errors?.confirmPassword?.message}</span>
      </div>
      <button disabled={loading} className="green_button">
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default ChangePassword;
