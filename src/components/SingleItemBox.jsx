import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";
import { RiHeartFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SingleItemBox = ({ data, boxType }) => {
  // console.log(data);
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <>
      {boxType === "grid" ? (
        <div className={`w-full relative rounded-lg border select-none bg-bgGray`}>
          {/* heart icon */}
          <div
            onClick={() => setIsFavourite(!isFavourite)}
            className={`absolute top-3 right-3 ${isFavourite && "bg-red-500"} border border-white rounded-lg p-2 cursor-pointer`}
          >
            {isFavourite ? (
              <RiHeartFill className="text-white text-3xl" />
            ) : (
              <IoHeartOutline className="text-white text-3xl" />
            )}
          </div>
          <Link to="/details">
            <img
              src={require("../assets/images/business_slider/Rectangle 375 (1).png")}
              alt=""
              className="object-cover w-full h-60 rounded-tl-lg rounded-tr-lg"
            />
          </Link>
          <div className="space-y-3 p-3">
            <p className="font-semibold text-left text-2xl">TAO Restaurant</p>
            <p className="font-medium text-left text-xl">
              304 Kent St, New York NSW 2000. USA
            </p>
            <p className="flex items-center gap-2 font-medium text-xl">
              <AiFillStar className="text-yellow-400 text-2xl" />
              <span>5.0 (24)</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex md:flex-nowrap flex-wrap gap-3 md:justify-between justify-center items-start rounded-lg border select-none bg-bgGray p-3 md:py-5 py-3">
          {/* heart icon */}

          <div className="flex items-start gap-2 flex-wrap">
            <Link to="/details">
              <img
                src={require("../assets/images/business_slider/Rectangle 375 (1).png")}
                alt=""
                className="object-cover md:w-52 md:h-52 w-full h-44 rounded-lg"
              />
            </Link>
            <div className="space-y-3 p-3">
              <p className="font-semibold text-left text-2xl">TAO Restaurant</p>
              <p className="font-medium text-left text-lg">
                304 Kent St, New York NSW 2000. USA
              </p>
              <p className="flex items-center gap-2 font-medium text-lg">
                <AiFillStar className="text-yellow-400 text-xl" />
                <span>5.0 (24)</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="bg-greenColor text-white flex items-center justify-center gap-2 text-center rounded-3xl py-3 w-40 font-semibold cursor-pointer text-base">
              <FaPhoneAlt className="text-2xl" />
              <span>Call</span>
            </p>
            <div
              onClick={() => setIsFavourite(!isFavourite)}
              className="cursor-pointer"
            >
              {isFavourite ? (
                <HiHeart className="text-red-500 text-3xl" />
              ) : (
                <HiOutlineHeart className="text-black text-opacity-50 text-3xl" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleItemBox;
