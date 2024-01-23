import React, { useState } from "react";

const RatingsModal = ({
  setRatingModal,
  setSelectedRating,
  selectedRating,
}) => {
  const [tempRating, setTempRating] = useState(null);
  return (
    <>
      <div
        onClick={() => setRatingModal(false)}
        className="fixed w-screen h-screen bg-black/20 backdrop-blur-sm inset-0 z-20"
      ></div>
      <div className="bg-white p-6 rounded-lg h-auto max-h-[80%] flex flex-col overflow-hidden w-1/3 space-y-3 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <p className="text-left font-semibold text-2xl">Ratings</p>
        <div className="overflow-y-auto custom_scrollbar space-y-3 max-h-full">
          <div className="w-full flex items-center justify-between">
            <label htmlFor="all">All</label>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  "
              id="all"
              onChange={(e) => setTempRating("all")}
              defaultChecked={selectedRating === "all"}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <label htmlFor="five">5 Star</label>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  "
              id="five"
              onChange={(e) => setTempRating("5")}
              defaultChecked={selectedRating === "5"}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <label htmlFor="four">4 star & above</label>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  "
              id="four"
              defaultChecked={selectedRating === "4"}
              onChange={(e) => setTempRating("4")}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <label htmlFor="three">3 star & above</label>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  "
              defaultChecked={selectedRating === "3"}
              id="three"
              onChange={(e) => setTempRating("3")}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <label htmlFor="two">2 star & above</label>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  "
              id="two"
              defaultChecked={selectedRating === "2"}
              onChange={(e) => setTempRating("2")}
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <label htmlFor="one">1 star & above</label>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg "
              id="one"
              defaultChecked={selectedRating === "1"}
              onChange={(e) => setTempRating("1")}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 justify-between">
          <button
            onClick={() => {
              setRatingModal(false);
              setTempRating(selectedRating);
            }}
            className="darkGray_button w-1/2"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setSelectedRating(tempRating);
              setRatingModal(false);
            }}
            className="green_button w-1/2"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default RatingsModal;
