import React from "react";
// import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const FindProduct = () => {
  return (
    <div className="bg-white flex items-center relative  flex-col gap-y-4 lg:p-[3rem] p-4 md:w-[60%] lg:w-[70%] xl:w-[60%] w-11/12 rounded-2xl">
      <span className="lg:text-[30px] 2xl:text-[42px] text-lg">
        Welcome to the <b className="text-[#023F86]">RJC</b>{" "}
        <b className="text-primary_color">Directory</b>{" "}
      </span>
      <p className="lg:w-11/12 text-center text-[14px] text-slate-400">
        Discover local businesses effortlessly with our comprehensive directory.
        Find services, contact details, and reviews for any business,
        simplifying your decision-making process.
      </p>

      <div
        // onSubmit={hanldeFindJob}
        className="shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-lg flex gap-3 justify-around items-center xl:flex-row xl:w-full flex-col w-full px-3 py-4"
      >
        <div className="gap-3 w-full">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-full px-3"
          />
        </div>
        <div className="gap-3 flex  xl:flex-row flex-col items-center w-full">
          <div className="flex w-full">
            <IoLocationOutline className="text-2xl" />
            <input
              type="text"
              placeholder="All Cities"
              className="outline-none text-sm w-full"
            />
          </div>
          <button
            type="submit"
            className="green_button  px-4 hover:bg-blue_button/80 active:scale-90 transition"
          >
            <div className="flex items-center justify-center gap-1">
              <IoIosSearch className="text-lg" />
              FIND
            </div>
          </button>
        </div>
      </div>
      {/* <div className="space-y-4 w-full"> */}
      {/* {loading && <span>Loading...</span>} */}
      {/* {searchResult.length > 0 && (
          <div className="suggestions shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] rounded-lg p-3 space-y-3 px-6 cursor-pointer w-full">
            {searchResult.map((item, index) => (
              <div onClick={() => handleSuggestionClick(item)} key={index}>
                <div className="suggestion-item">{item}</div>
                <hr className="mt-1" />
              </div>
            ))}
          </div>
        )} */}
      {/* </div> */}
    </div>
  );
};

export default FindProduct;
