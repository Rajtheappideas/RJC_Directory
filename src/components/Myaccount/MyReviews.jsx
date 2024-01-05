import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import SingleReview from "./SingleReview";

const MyReviews = ({ setShowReviewBox }) => {
  return (
    <div className="lg:space-y-6 space-y-3 overflow-y-auto">
      <p className="font-semibold text-2xl ">My Reviews</p>
      <div className="overflow-y-auto max-h-[80vh] custom_scrollbar">
        <SingleReview setShowReviewBox={setShowReviewBox} />
        <SingleReview setShowReviewBox={setShowReviewBox} />
        <SingleReview setShowReviewBox={setShowReviewBox} />
        <SingleReview setShowReviewBox={setShowReviewBox} />
        <SingleReview setShowReviewBox={setShowReviewBox} />
      </div>
    </div>
  );
};

export default MyReviews;
