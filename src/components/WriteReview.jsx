import React from "react";
import { AiFillStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const WriteReview = ({ setShowReviewBox }) => {
  return (
    <>
      <div onClick={()=>setShowReviewBox(false)} className="fixed w-screen h-screen bg-black/20 backdrop-blur-sm inset-0 z-20"></div>
      <div className="bg-white p-6 rounded-lg  xl:w-1/3 md:w-1/2 w-10/12 flex items-center  justify-center gap-3 flex-col fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <IoMdClose
          onClick={() => setShowReviewBox(false)}
          className="absolute top-3 right-3 text-black text-xl cursor-pointer"
        />
        <p className="text-center font-semibold text-2xl">Lorem ipsum</p>
        <div className="flex items-center flex-wrap gap-2">
          <AiFillStar className="text-yellow-500 text-lg" />
          <AiFillStar className="text-yellow-500 text-lg" />
          <AiFillStar className="text-yellow-500 text-lg" />
          <AiFillStar className="text-yellow-500 text-lg" />
          <AiFillStar className="text-yellow-500 text-lg" />
        </div>
        <textarea
          name="review"
          id=""
          className="w-full rounded-lg p-2 min-h-[10rem] max-h-40 border outline-none"
          placeholder="Type here..."
        ></textarea>
        <button className="green_button">Submit</button>
      </div>
    </>
  );
};

export default WriteReview;
