import React from "react";
// import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import { FaArrowUp, FaArrowUpLong, FaSortDown } from "react-icons/fa6";

const FindProduct = () => {
  return (
    <div className="bg-white flex items-center relative  flex-col gap-y-4 lg:px-20 lg:py-10 p-4 xl:w-[70%] w-11/12 rounded-2xl">
      <span className="lg:text-4xl md:text-3xl text-2xl">
        Welcome to the <b className="text-[#023F86] font-extrabold">RJC</b>{" "}
        <b className="text-[#009F4B] font-extrabold">Directory</b>{" "}
      </span>
      <p className="lg:w-11/12 lg:text-center text-justify text-base text-textColor text-opacity-50">
        Discover local businesses effortlessly with our comprehensive directory.
        Find services, contact details, and reviews for any business,
        simplifying your decision-making process.
      </p>

      <div className="flex md:flex-row flex-col w-full items-center justify-between gap-4 md:px-1.5 md:py-1.5 p-3 border border-opacity-50 border-borderColor md:rounded-[2rem] rounded-2xl bg-gray-50">
        <div className="lg:w-8/12 md:w-7/12 w-full relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-5 placeholder:text-opacity-60 outline-none p-1 bg-transparent"
        />
          {/* <span className="absolute z-10  top-14 clip-div border shadow-lg left-10 rotate-[135deg] bg-white h-6 w-6"></span>
          <div className="absolute transition-all border origin-top bg-white w-full text-left ease-in-out duration-300 top-16 left-0 p-3 max-h-72 overflow-y-auto custom_scrollbar rounded-2xl shadow-2xl text-textColor space-y-2">
            <p className="w-full p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all">
              <IoSearch className="h-4 w-4 text-opacity-50 text-gray-400 mr-2" />{" "}
              Chicago{" "}
              <FaArrowUpLong className="h-4 w-4 ml-auto text-gray-300 -rotate-45" />
            </p>
            <p className="w-full p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all">
              <IoSearch className="h-4 w-4 text-opacity-50 text-gray-400 mr-2" />{" "}
              Chicago{" "}
              <FaArrowUpLong className="h-4 w-4 ml-auto text-gray-300 -rotate-45" />
            </p>
            <p className="w-full p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all">
              <IoSearch className="h-4 w-4 text-opacity-50 text-gray-400 mr-2" />{" "}
              Chicago{" "}
              <FaArrowUpLong className="h-4 w-4 ml-auto text-gray-300 -rotate-45" />
            </p>
            <p className="w-full p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all">
              <IoSearch className="h-4 w-4 text-opacity-50 text-gray-400 mr-2" />{" "}
              Chicago{" "}
              <FaArrowUpLong className="h-4 w-4 ml-auto text-gray-300 -rotate-45" />
            </p>
            <p className="w-full p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all">
              <IoSearch className="h-4 w-4 text-opacity-50 text-gray-400 mr-2" />{" "}
              Chicago{" "}
              <FaArrowUpLong className="h-4 w-4 ml-auto text-gray-300 -rotate-45" />
            </p>
            <p className="w-full p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all">
              <IoSearch className="h-4 w-4 text-opacity-50 text-gray-400 mr-2" />{" "}
              Chicago{" "}
              <FaArrowUpLong className="h-4 w-4 ml-auto text-gray-300 -rotate-45" />
            </p>
            <p className="w-full p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all">
              <IoSearch className="h-4 w-4 text-opacity-50 text-gray-400 mr-2" />{" "}
              Chicago{" "}
              <FaArrowUpLong className="h-4 w-4 ml-auto text-gray-300 -rotate-45" />
            </p>
            <p className="w-full p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all">
              <IoSearch className="h-4 w-4 text-opacity-50 text-gray-400 mr-2" />{" "}
              Chicago{" "}
              <FaArrowUpLong className="h-4 w-4 ml-auto text-gray-300 -rotate-45" />
            </p>
          </div> */}
        </div>
        <span className="bg-opacity-40 bg-gray-400 md:h-6 md:w-[1px] w-full h-[1px] "></span>
        <div className="flex group relative items-center cursor-pointer gap-3 lg:w-2/12 md:w-3/12 w-full">
          <IoLocationOutline className="min-h-6 min-w-[1.5rem]" />
          <span className="font-semibold ">All Cities</span>
          <FaSortDown
            className={`text-black h-4 w-4 mb-2 group-hover:mb-0 duration-300 group-hover:rotate-180 transition-all `}
          />
          <div className="absolute group-hover:scale-100 scale-0 transition-all origin-top bg-white min-w-[13rem] text-left ease-in-out duration-300 top-9 left-0 p-3 max-h-72 overflow-y-auto custom_scrollbar rounded-2xl shadow-2xl text-textColor space-y-2">
            <p className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all">
              Chicago
            </p>
            <p className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all">
              Chicago
            </p>
            <p className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all">
              Chicago
            </p>
            <p className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all">
              Chicago
            </p>
            <p className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all">
              Chicago
            </p>
            <p className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all">
              Chicago
            </p>
            <p className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all">
              Chicago
            </p>
            <p className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all">
              Chicago
            </p>
          </div>
        </div>
        <button className="lg:w-[15%]  md:w-2/12 w-full h-12 uppercase active:scale-90 transition-all font-semibold text-white bg-greenColor rounded-3xl">
          <IoSearch className="h-6 w-6 inline-block mr-1 mb-0.5" />
          Find
        </button>
      </div>
    </div>
  );
};

export default FindProduct;
