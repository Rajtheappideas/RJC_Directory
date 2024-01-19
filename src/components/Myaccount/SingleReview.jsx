import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

const SingleReview = ({ setShowReviewBox }) => {
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  return (
    <div className="space-y-2">
      <div className="w-full flex items-start gap-3">
        <img
          src={require("../../assets/images/business_slider/Rectangle 375.png")}
          alt=""
          className="w-28 h-28 rounded-2xl"
        />
        <div className="space-y-1 ">
          <p className="font-semibold text-xl">TAO Restaurant</p>
          <div className="w-full flex items-center gap-2">
            <AiFillStar className="text-yellow-500 w-6 h-6" />
            <AiFillStar className="text-yellow-500 w-6 h-6" />
            <AiFillStar className="text-yellow-500 w-6 h-6" />
            <AiFillStar className="text-yellow-500 w-6 h-6" />
            <AiFillStar className="text-yellow-500 w-6 h-6" />
          </div>
          <p className="text-lg text-opacity-50 tracking-wide">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque,
            ullam ratione pariatur dolorum distinctio cupiditate voluptas odio
            quod aliquam nisi doloremque aut recusandae, eligendi dolores nihil
            vero illo molestias obcaecati!
          </p>
          <p className="text-sm text-textColor text-opacity-50">Dec 25, 2023</p>
          <div className="flex text-blueColor font-semibold text-lg items-center gap-5">
            <p
              className="cursor-pointer"
              onClick={() => setShowReviewBox(true)}
            >
              Edit
            </p>
            <div className="inline-block relative">
              <button onClick={() => setShowDeleteBox(true)}>Delete</button>
              {/* delete box */}
              {showDeleteBox && (
                <div className="absolute w-auto space-y-2 top-6 left-0 shadow-2xl bg-white  rounded-lg p-3 font-semibold text-lg">
                  <span className="absolute top-4 left-0"></span>
                  <p className="whitespace-nowrap w-full text-black">
                    Are you sure you want to delete this review?
                  </p>
                  <div className="flex items-center gap-2 ">
                    <button
                      className="Label hover:bg-blue-100 p-1 transition-all"
                      onClick={() => setShowDeleteBox(false)}
                    >
                      Cancel
                    </button>
                    <button className="text-red-500 hover:bg-red-100 transition-all p-1 text-opacity-60">
                      Yes,Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="py-2" />
    </div>
  );
};

export default SingleReview;
