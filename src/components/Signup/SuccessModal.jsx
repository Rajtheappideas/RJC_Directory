import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SuccessModal = () => {
  return (
    <>
      <div className="fixed w-screen h-screen bg-black/20 backdrop-blur-sm inset-0 z-10"></div>
      <div className="bg-white p-6 rounded-lg h-1/2 xl:w-1/3 md:w-1/2 w-10/12 flex items-center  justify-center gap-3 flex-col fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <IoMdClose className="absolute top-3 right-3 text-black text-xl cursor-pointer" />
        <FaCircleCheck className="text-green-600 text-center h-20 w-20" />
        <p className="text-center font-semibold text-2xl">
          Your account has been successfully created
        </p>
        <button className="green_button">Let's Go</button>
      </div>
    </>
  );
};

export default SuccessModal;
