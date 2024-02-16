import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ setShowSuccessModal }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed w-screen h-screen bg-black/20 backdrop-blur-sm inset-0 z-50"></div>
      <div className="bg-white p-6 rounded-lg h-1/2 xl:w-1/3 md:w-1/2 w-10/12 flex items-center  justify-center gap-3 flex-col z-50  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <IoMdClose
          onClick={() => {
            navigate("/sign-in");
            setShowSuccessModal(false);
          }}
          className="absolute top-3 right-3 text-black text-xl "
          role="button"
        />
        <FaCircleCheck className="text-green-600 text-center h-20 w-20" />
        <p className="text-center font-semibold text-2xl">Password changed!</p>
        <button
          onClick={() => {
            navigate("/sign-in");
            setShowSuccessModal(false);
          }}
          className="green_button"
        >
          Back to Sign In
        </button>
      </div>
    </>
  );
};

export default SuccessModal;
