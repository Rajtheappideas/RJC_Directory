import React from "react";
import { AiFillStar, AiOutlineClose, AiOutlineStar } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

const Filters = () => {
  const { allData, loading } = useSelector((s) => s.root.merchant);
  return (
    <div className="xl:w-3/12 w-full  border border-gray-200 rounded-lg p-3 space-y-3">
      {/* titles */}
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold text-2xl text-blue-800">Filters</p>
        <p className="font-medium cursor-pointer hover:bg-blueColor/10 transition-all p-1 text-xl uppercase text-blueColor">
          Clear all
        </p>
      </div>
      {/* choosen filtes */}
      <div className="w-full flex flex-wrap gap-2 items-center">
        <p className="w-auto p-2 flex items-center gap-2 cursor-pointer bg-gray-200 text-textColor opacity-80">
          Restaurant <AiOutlineClose />
        </p>
        <p className="w-auto p-2 flex items-center gap-2 cursor-pointer bg-gray-200 text-textColor opacity-80">
          Indian <AiOutlineClose />
        </p>
        <p className="w-auto p-2 flex items-center gap-2 cursor-pointer bg-gray-200 text-textColor opacity-80">
          USA <AiOutlineClose />
        </p>
        <p className="w-auto p-2 flex items-center gap-2 cursor-pointer bg-gray-200 text-textColor opacity-80">
          New York <AiOutlineClose />
        </p>
        <p className="w-auto p-2 flex items-center gap-2 cursor-pointer bg-gray-200 text-textColor opacity-80">
          5 <AiOutlineStar /> <AiOutlineClose />
        </p>
      </div>
      <hr className="w-full" />
      {/* my preferences */}
      <div className="flex w-full justify-between items-center">
        <p className="font-semibold text-xl">My preferences</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
      </div>
      <hr className="w-full" />
      {/* category */}
      <div className="w-full h-52 overflow-hidden flex flex-col gap-2">
        <p className="flex items-center justify-between w-full text-xl font-semibold">
          <span>Category</span>
          <IoIosArrowDown className="text-xl cursor-pointer" />
        </p>

        <div className="h-full p-2 overflow-y-auto space-y-1 text-textColor font-medium text-lg">
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Restaurant
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Restaurant
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Restaurant
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Restaurant
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Restaurant
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Restaurant
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Restaurant
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Restaurant
          </p>
        </div>
      </div>
      <hr className="w-full" />
      {/*sub category */}
      <div className="w-full h-52 overflow-hidden flex flex-col gap-2">
        <p className="flex items-center justify-between w-full text-xl font-semibold">
          <span>Sub Category</span>
          <IoIosArrowDown className="text-xl cursor-pointer" />
        </p>

        <div className="h-full p-2 overflow-y-auto space-y-1 text-textColor font-medium text-lg">
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Italain Restaurant
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Italain Restaurant{" "}
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Italain Restaurant{" "}
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Italain Restaurant{" "}
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Italain Restaurant{" "}
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Italain Restaurant{" "}
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Italain Restaurant{" "}
          </p>
          <p className="cursor-pointer hover:bg-gray-100 transition-all w-full p-1">
            Italain Restaurant{" "}
          </p>
        </div>
      </div>
      <hr />
      {/* location */}
      <div className="w-full space-y-2">
        <p className="flex items-center justify-between w-full text-xl font-semibold">
          <span>Locaiton</span>
          <IoIosArrowDown className="text-xl cursor-pointer" />
        </p>

        {/* country */}
        <div className="space-y-2">
          <label htmlFor="country" className="Label">
            Country
          </label>

          <select name="country" id="" className="input_field">
            <option value="india">india</option>
            <option value="india">india</option>
            <option value="india">india</option>
            <option value="india">india</option>
            <option value="india">india</option>
            <option value="india">india</option>
          </select>
        </div>
        {/* city */}
        <div className="space-y-2">
          <label htmlFor="city" className="Label">
            City
          </label>

          <select name="city" id="" className="input_field">
            <option value="gujarat">gujarat</option>
            <option value="gujarat">gujarat</option>
            <option value="gujarat">gujarat</option>
            <option value="gujarat">gujarat</option>
          </select>
        </div>
      </div>
      <hr />
      {/* ratings */}
      <div className="w-full space-y-2">
        <p className="flex items-center justify-between w-full text-xl font-semibold">
          <span>Ratings</span>
          <IoIosArrowDown className="text-xl cursor-pointer" />
        </p>

        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 accent-green-400 border " />
          <p className="text-textColor">Any</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 accent-green-400 border " />
          <p className="text-textColor">5</p>
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 accent-green-400 border " />
          <p className="text-textColor">4</p>
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 accent-green-400 border " />
          <p className="text-textColor">3</p>
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 accent-green-400 border " />
          <p className="text-textColor">2</p>
          <AiFillStar className="text-yellow-400 text-xl" />
          <AiFillStar className="text-yellow-400 text-xl" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 accent-green-400 border " />
          <p className="text-textColor">1</p>
          <AiFillStar className="text-yellow-400 text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
