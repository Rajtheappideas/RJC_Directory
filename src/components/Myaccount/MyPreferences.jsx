import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "../Signup/CategoryModal";
import RatingsModal from "../Signup/RatingsModal";
import {
  handleAddAndEditPreference,
  handleGetPreference,
} from "../../redux/AuthSlice";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import toast from "react-hot-toast";

const MyPreferences = ({}) => {
  const [showCategoryMOdal, setShowCategoryMOdal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [distance, setDistance] = useState(1);

  const { preferences, token, preferencesLoading, preferenceGetLoading } =
    useSelector((s) => s.root.auth);

  const { AbortControllerRef } = useAbortApiCall();

  const dispatch = useDispatch();

  const handleClickOnSave = () => {
    console.log(selectedRating)
    const response = dispatch(
      handleAddAndEditPreference({
        token,
        selectedCategories,
        distance,
        selectedRating:
          selectedRating === "all" ? " ".toString() : selectedRating,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success) {
          setShowCategoryMOdal(false);
          toast.success(res?.payload?.message);
          dispatch(handleGetPreference({ token, signal: AbortControllerRef }));
        }
      });
    }
  };

  useEffect(() => {
    if (!preferencesLoading && !preferenceGetLoading) {
      setSelectedCategories(preferences?.categories ?? []);
      setSelectedRating(preferences?.rating);
      // setDistance(preferences?.distance);
    }
  }, [preferencesLoading, preferenceGetLoading]);

  return (
    <>
      {showCategoryMOdal && (
        <CategoryModal
          selectedCategories={preferences?.categories}
          setShowCategoryMOdal={setShowCategoryMOdal}
          setSelectedCategories={setSelectedCategories}
        />
      )}
      {ratingModal && (
        <RatingsModal
          selectedRating={preferences?.rating}
          setRatingModal={setRatingModal}
          setSelectedRating={setSelectedRating}
        />
      )}

      {preferenceGetLoading ? (
        <div className="loading">Loading...</div>
      ) : (
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
                placeholder={
                  selectedCategories?.length > 0
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
                ratings
              </label>
              <input
                type="text"
                className="input_field cursor-pointer placeholder:text-black"
                readOnly
                placeholder={
                  selectedRating === null ? "ratings..." : selectedRating
                }
                onClick={() => setRatingModal(true)}
              />
              <MdKeyboardArrowRight className="absolute top-9 bg-white right-2 h-6 w-6" />
            </div>
            {/* <div className="space-y-1 w-full relative">
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
          </div> */}
            <div className="space-y-1  w-full">
              <label htmlFor="distance" className="Label">
                distance
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
          </div>
          <button
            onClick={handleClickOnSave}
            disabled={preferencesLoading}
            className="green_button w-40"
          >
            {preferencesLoading ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </>
  );
};

export default MyPreferences;
