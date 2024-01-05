import React from "react";
import { IoCamera } from "react-icons/io5";

const ManageAccount = () => {
  return (
    <div className="lg:space-y-6 space-y-3">
      <p className="font-semibold text-2xl">Manage Account</p>
      <div className="h-14 w-14 cursor-pointer rounded-full border-[3px] bg-gray-300 border-blueColor relative">
        <div className="relative border-white border-4 w-full h-full rounded-full">
          <IoCamera className="w-6 h-6 absolute text-white top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2" />
          <input
            type="file"
            className="w-full h-full cursor-pointer opacity-0 absolute text-white top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-2 gap-3">
        <div className="w-full">
          <label htmlFor="name" className="Label">
            Name
          </label>
          <input type="text" className="input_field" />
        </div>
        <div className="w-full">
          <label htmlFor="email" className="Label">
            Email id
          </label>
          <input type="email" className="input_field" />
        </div>
        <div className="w-full">
          <label htmlFor="phone" className="Label">
            Phone number
          </label>
          <input type="number" className="input_field" />
        </div>
        <div className="w-full">
          <label htmlFor="dob" className="Label">
            DOB
          </label>
          <input type="date" className="input_field" />
        </div>
        <div className="w-full">
          <label htmlFor="anniversary" className="Label">
            Anniversary
          </label>
          <input type="date" className="input_field" />
        </div>
        <div/>
        <div className="w-full ">
          <label htmlFor="country" className="Label">
            country
          </label>
          <input type="text" className="input_field" />
        </div>
        <div className="w-full">
          <label htmlFor="city" className="Label">
            city
          </label>
          <input type="text" className="input_field" />
        </div>
      </div>
      <button className="green_button">Save</button>
    </div>
  );
};

export default ManageAccount;
