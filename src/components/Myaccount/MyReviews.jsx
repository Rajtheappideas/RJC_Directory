import React from "react";
import SingleReview from "./SingleReview";
import { useSelector } from "react-redux";

const MyReviews = ({ setShowReviewBox }) => {
  const { reviews, loading } = useSelector((s) => s.root.review);

  return (
    <div className="lg:space-y-6 space-y-3">
      <p className="font-semibold text-2xl ">My Reviews</p>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className=" custom_scrollbar">
          {reviews.length === 0 ? (
            <div className="loading">No Reviews here.</div>
          ) : (
            reviews.map((review) => (
              <SingleReview
                key={review?._id}
                review={review}
                setShowReviewBox={setShowReviewBox}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
