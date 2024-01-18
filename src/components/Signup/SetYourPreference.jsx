import React, { useState } from "react";
import CategoryModal from "./CategoryModal";
import RatingsModal from "./RatingsModal";
import FoodChoiceModal from "./FoodChoiceModal";
import { MdKeyboardArrowRight } from "react-icons/md";

const SetYourPreference = () => {
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [showCategoryMOdal, setShowCategoryMOdal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [foodChoiceModal, setFoodChoiceModal] = useState(false);

  return (
    <>
      {showCategoryMOdal && (
        <CategoryModal setShowCategoryMOdal={setShowCategoryMOdal} />
      )}
      {ratingModal && <RatingsModal setRatingModal={setRatingModal} />}
      {foodChoiceModal && (
        <FoodChoiceModal setFoodChoiceModal={setFoodChoiceModal} />
      )}
      <div className="w-screen grid lg:grid-cols-2 xl:gap-0 gap-5 justify-center place-items-center items-center min-h-screen max-h-fit">
        {/* images */}
        <div className="w-full h-full relative lg:block hidden">
          <img
            src={require("../../assets/images/bgImage.png")}
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src={require("../../assets/images/logoMain.png")}
            alt=""
            className="w-40 h-fit object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
          <img
            src={require("../../assets/images/logoTitle.png")}
            alt=""
            className="w-40 h-fit object-cover absolute top-[63%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          />
        </div>
        {/* form */}
        {!showOtpBox ? (
          <div className="xl:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
            <img
              src={require("../../assets/images/bgImage.png")}
              alt=""
              className="w-full h-full fixed lg:hidden -z-10 object-cover  top-0 left-0"
            />
            <div className="bg-white text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg relative">
              <img
                src={require("../../assets/images/Logo.png")}
                alt=""
                className="w-fit h-fit object-cover lg:hidden absolute -top-14 left-1/2 -translate-x-1/2 z-10"
              />
              <p className="font-semibold  text-left text-2xl">
                Set your preferences
              </p>
              <div className="space-y-1 w-full relative">
                <label htmlFor="category" className="Label">
                  Category
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="category..."
                  className="input_field cursor-pointer placeholder:text-black"
                  onClick={() => setShowCategoryMOdal(true)}
                />
                <MdKeyboardArrowRight className="absolute top-9 right-2 h-6 w-6" />
              </div>
              <div className="space-y-1 w-full relative">
                <label htmlFor="ratings" className="Label">
                  Ratings
                </label>
                <input
                  type="text"
                  placeholder="ratings..."
                  className="input_field cursor-pointer placeholder:text-black"
                  readOnly
                  onClick={() => setRatingModal(true)}
                />
                <MdKeyboardArrowRight className="absolute top-9 right-2 h-6 w-6" />
              </div>
              <div className="space-y-1 w-full relative">
                <label htmlFor="foodchoices" className="Label">
                  Food choices
                </label>
                <input
                  type="text"
                  placeholder="food choices..."
                  className="input_field cursor-pointer placeholder:text-black"
                  readOnly
                  onClick={() => setFoodChoiceModal(true)}
                />
                <MdKeyboardArrowRight className="absolute top-9 right-2 h-6 w-6" />
              </div>
              <div className="space-y-1">
                <label htmlFor="Food Choices" className="Label">
                  Distance
                </label>
                <input type="range" className="input_field" min="2" max="5" />
              </div>
              <div className="flex items-center gap-3 justify-between w-full">
                <button className="blue_button w-1/2">Skip</button>
                <button className="green_button w-1/2">Submit</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
            <img
              src={require("../../assets/images/bgImage.png")}
              alt=""
              className="w-full h-screen fixed lg:hidden -z-10 object-cover"
            />

            <div className="bg-white relative text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg md:w-2/3 w-full">
              <img
                src={require("../../assets/images/Logo.png")}
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

              <button className="green_button w-full">Verify My number</button>

              <div className="text-center">
                <p className="text-xs">Resend code 0:57</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SetYourPreference;
