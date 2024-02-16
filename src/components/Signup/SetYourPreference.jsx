import React, { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";
import RatingsModal from "./RatingsModal";
import FoodChoiceModal from "./FoodChoiceModal";
import { MdKeyboardArrowRight } from "react-icons/md";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleAddAndEditPreference } from "../../redux/AuthSlice";
import useAbortApiCall from "../../hooks/useAbortApiCall";

const SetYourPreference = ({ setShowSuccess }) => {
  const [showCategoryMOdal, setShowCategoryMOdal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [foodChoiceModal, setFoodChoiceModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [distance, setDistance] = useState(1);

  const { token, preferencesLoading, preferenceGetLoading } = useSelector(
    (s) => s.root.auth
  );
  const dispatch = useDispatch();

  const { AbortControllerRef } = useAbortApiCall();

  const handleSetPreference = async () => {
    toast.remove();
    if (selectedCategories.length === 0 || selectedRating === null) {
      return toast.error("please select the category & ratings");
    } else {
      const response = dispatch(
        handleAddAndEditPreference({
          token,
          selectedRating: selectedRating === "all" ? "" : selectedRating,
          distance,
          selectedCategories,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success) {
            setShowSuccess(true);
          }
        });
      }
    }
  };

  return (
    <>
      {showCategoryMOdal && (
        <CategoryModal
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setShowCategoryMOdal={setShowCategoryMOdal}
          from="set_your_preference"
        />
      )}
      {ratingModal && (
        <RatingsModal
          setSelectedRating={setSelectedRating}
          setRatingModal={setRatingModal}
          selectedRating={selectedRating}
        />
      )}
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
            loading="lazy"
          />
          <Link
            to="/"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 space-y-4"
          >
            <img
              src={require("../../assets/images/logoMain.png")}
              alt=""
              className="xl:w-40 w-32 h-fit object-cover"
              loading="lazy"
            />
            <img
              src={require("../../assets/images/logoTitle.png")}
              alt=""
              className="xl:w-40 w-32 h-fit object-cover "
              loading="lazy"
            />
          </Link>
        </div>
        {/* form */}
        <div className="lg:w-full w-screen bg-bgGray h-full p-3 flex items-center justify-center relative z-0">
          <img
            src={require("../../assets/images/bgImage.png")}
            alt=""
            className="w-full h-full fixed lg:hidden -z-10 object-cover  top-0 left-0"
            loading="lazy"
          />
          <div className="bg-white relative text-[#000D23] space-y-4 lg:mt-0 mt-14 rounded-lg md:p-10 p-4 shadow-lg">
            <img
              src={require("../../assets/images/Logo.png")}
              alt=""
              className="w-fit h-fit object-cover lg:hidden absolute -top-14 left-1/2 -translate-x-1/2 z-10"
              loading="lazy"
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
                placeholder={
                  selectedCategories.length > 0
                    ? selectedCategories.map((cate) => cate?.name)
                    : "category..."
                }
                className="input_field cursor-pointer placeholder:text-black"
                onClick={() => setShowCategoryMOdal(true)}
              />
              <MdKeyboardArrowRight className="absolute top-9 bg-white right-2 h-6 w-6" />
            </div>
            <div className="space-y-1 w-full relative">
              <label htmlFor="ratings" className="Label">
                Ratings
              </label>
              <input
                type="text"
                placeholder={
                  selectedRating === null ? "ratings..." : selectedRating
                }
                value={selectedRating}
                className="input_field cursor-pointer placeholder:text-black"
                readOnly
                onClick={() => setRatingModal(true)}
              />
              <MdKeyboardArrowRight className="absolute bg-white top-9 right-2 h-6 w-6" />
            </div>
            {/* <div className="space-y-1 w-full relative">
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
              </div> */}
            <div className="space-y-1">
              <label htmlFor="distance" className="Label">
                Distance
              </label>
              <input
                type="range"
                className="input_field"
                onChange={(e) => setDistance(e.target.value)}
                min="1"
                max="50"
                defaultValue={1}
              />
              <span className="font-semibold">{distance} km</span>
            </div>
            <div className="flex items-center gap-3 justify-between w-full">
              <Link to="/" className="w-1/2">
                <button className="blue_button w-full">Skip</button>
              </Link>
              <button
                className="green_button w-1/2"
                onClick={handleSetPreference}
                disabled={preferencesLoading}
              >
                {preferencesLoading ? "submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetYourPreference;
