import moment from "moment";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import BaseUrl from "../../BaseUrl";
import { handleChangeSelectedReview } from "../../redux/ReviewSlice";

const Rating = ({ setShowReviewBox }) => {
  const [show, setShow] = useState(3);

  const { merchantDetails, merchantByIdLoading } = useSelector(
    (s) => s.root.merchant
  );
  const { user } = useSelector((s) => s.root.auth);

  const dispatch = useDispatch();

  function handleLoadMore() {
    if (
      merchantDetails?.reviews.slice(0, show + 3).length >=
      merchantDetails?.reviews?.length
    ) {
      setShow(merchantDetails?.reviews.length);
    } else {
      setShow((prev) => prev + 3);
    }
  }

  function findReview() {
    let findReview = merchantDetails?.reviews.find(
      (review) => review?.user?.name === user?.name
    );
    if (findReview) {
      const merchant = {
        _id: findReview?._id,
        merchant: {
          _id: merchantDetails?._id,
          images: merchantDetails?.images,
          name: merchantDetails?.name,
        },
        rating: findReview?.rating,
        comment: findReview?.comment,
      };
      return merchant;
    } else {
      const merchant = {
        _id: merchantDetails?._id,
        images: merchantDetails?.images,
        name: merchantDetails?.name,
      };
      return { merchant };
    }
  }

  return (
    <div className="space-y-3 w-full overflow-y-auto">
      <p className="font-semibold md:text-3xl text-xl">Rating and reviews</p>

      <div className="w-full items-center flex justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold md:text-5xl text-2xl">
            {merchantDetails?.avgRating}
          </span>
          <AiFillStar className="text-yellow-500  text-3xl" />
        </div>
        <div>
          <button
            className="green_button"
            onClick={() => {
              dispatch(handleChangeSelectedReview(findReview()));
              setShowReviewBox(true);
            }}
          >
            write review
          </button>
        </div>
      </div>
      <p className="text-lg text-textColor text-opacity-50">
        {merchantDetails?.avgRating} ratings and {merchantDetails?.totalRating}{" "}
        reviews
      </p>
      {/* reviews */}
      <div className="overflow-y-auto max-h-[60vh] space-y-2 custom_scrollbar p-3 rounded-lg">
        {merchantDetails?.reviews.length > 0 ? (
          merchantDetails?.reviews.slice(0, show).map((review) => (
            <div className="w-full" key={review?._id}>
              <div className="flex items-start md:gap-5 gap-3">
                <img
                  src={BaseUrl.concat(review?.user?.photo)}
                  alt={review?.user?.name}
                  className="md:h-10 h-6 md:w-10 w-6 rounded-full object-cover"
                ></img>
                <div className="space-y-1 w-full">
                  <div className="w-full flex items-center gap-2 justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-2xl">
                        {review?.user?.name}
                      </p>
                      <p className="font-medium text-base">
                        {moment(review?.createdAt).fromNow()}
                      </p>
                    </div>
                  
                    <div className="flex items-center flex-wrap md:gap-2 gap-1 flex-initial">
                      {new Array(review?.rating).fill("").map((rate, i) => (
                        <AiFillStar
                          key={i}
                          className="text-yellow-500 text-lg"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-medium text-lg text-textColor text-opacity-50  tracking-wide">
                    {review?.comment}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="loading">No Reviews here.</div>
        )}
      </div>

      {/* load more */}
      {merchantDetails?.reviews.length !== show &&
        merchantDetails?.reviews.length >= show && (
          <div className=" w-full text-right">
            <button
              className="darkBlue_button"
              onClick={() => handleLoadMore()}
            >
              Load more
            </button>
          </div>
        )}
    </div>
  );
};

export default Rating;
