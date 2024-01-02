import React from "react";

const RatingsModal = ({ setRatingModal }) => {
  return (
    <>
      <div className="fixed w-screen h-screen bg-black/20 backdrop-blur-sm inset-0 z-10"></div>
      <div className="bg-white p-6 rounded-lg h-auto max-h-[80%] flex flex-col overflow-hidden w-1/3 space-y-3 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <p className="text-left font-semibold text-2xl">Ratings</p>
        <div className="overflow-y-auto space-y-3 max-h-full">
          <div className="w-full flex items-center justify-between">
            <p>All</p>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>5 Star</p>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>4 star & above</p>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>3 star & above</p>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>2 star & above</p>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>1 star & above</p>
            <input
              type="radio"
              name="rating"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 justify-between">
          <button
            onClick={() => setRatingModal(false)}
            className="darkGray_button w-1/2"
          >
            Cancel
          </button>
          <button className="green_button w-1/2">Save</button>
        </div>
      </div>
    </>
  );
};

export default RatingsModal;
