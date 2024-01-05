import React from "react";

const ChangePassword = () => {
  return (
    <div className="lg:space-y-6 space-y-3">
      <p className="font-semibold text-2xl">Change Password</p>
      <div className="space-y-1 w-1/2">
        <label htmlFor="currentPassword" className="Label">
          Current password*
        </label>
        <input
          type="password"
          placeholder="type here..."
          className="input_field"
        />
      </div>
      <div className="space-y-1 w-1/2">
        <label htmlFor="newPassword" className="Label">
          new password*
        </label>
        <input
          type="password"
          placeholder="type here..."
          className="input_field"
        />{" "}
      </div>
      <div className="space-y-1 w-1/2">
        <label htmlFor="confirmPassword" className="Label">
          confirm password*
        </label>
        <input
          type="password"
          placeholder="type here..."
          className="input_field"
        />{" "}
      </div>
      <button className="green_button">Update</button>
    </div>
  );
};

export default ChangePassword;
