import React from "react";

const FoodChoiceModal = ({ setFoodChoiceModal }) => {
  return (
    <>
      <div onClick={()=>setFoodChoiceModal(false)} className="fixed w-screen h-screen bg-black/20 backdrop-blur-sm inset-0 z-20"></div>
      <div className="bg-white p-6 rounded-lg h-auto max-h-[80%] flex flex-col overflow-hidden w-1/3 space-y-3 fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <p className="text-left font-semibold text-2xl">Food Choices</p>
        <div className="overflow-y-auto custom_scrollbar space-y-3 max-h-full px-2">
          <div className="w-full flex items-center justify-between">
            <p>All</p>
            <input
              type="checkbox"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>Vegan</p>
            <input
              type="checkbox"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>Vegeterian</p>
            <input
              type="checkbox"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>Eggeterian</p>
            <input
              type="checkbox"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
          <div className="w-full flex items-center justify-between">
            <p>Nonveg</p>
            <input
              type="checkbox"
              className="w-5 h-5 rounded-lg  accent-greenColor"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3 justify-between">
          <button
            onClick={() => setFoodChoiceModal(false)}
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

export default FoodChoiceModal;
