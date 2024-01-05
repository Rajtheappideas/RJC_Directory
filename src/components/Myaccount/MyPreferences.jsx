import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const MyPreferences = ({
  setShowCategoryMOdal,
  setRatingModal,
  setFoodChoiceModal,
}) => {
  return (
    <>
      <div className="lg:space-y-6 space-y-3 overflow-y-auto">
        <p className="font-semibold text-2xl ">My Preferences</p>
        <div className="w-full grid lg:grid-cols-2 gap-5">
          <div className="space-y-1 w-full relative">
            <label htmlFor="category" className="Label">
              category
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
              ratings
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
            <label htmlFor="foodChoices" className="Label">
              food choices
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
          <div />
          <div className="space-y-1 w-full">
            <label htmlFor="distance" className="Label">
              distance
            </label>
            <input
              type="range"
              min="2"
              max="10"
              className="w-full input_field"
            />
          </div>
        </div>
        <button className="green_button w-40">save</button>
      </div>
    </>
  );
};

export default MyPreferences;
