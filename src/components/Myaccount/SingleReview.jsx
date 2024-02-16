import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import BaseUrl from "../../BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeSelectedReview,
  handleDeleteReview,
} from "../../redux/ReviewSlice";
import toast from "react-hot-toast";
import useAbortApiCall from "../../hooks/useAbortApiCall";
import moment from "moment";
import { Link } from "react-router-dom";

const SingleReview = ({ setShowReviewBox, review }) => {
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  const { token } = useSelector((s) => s.root.auth);
  const { deleteLoading, addLoading, loading, selectedReview } = useSelector(
    (s) => s.root.review
  );

  const { AbortControllerRef } = useAbortApiCall();

  const dispatch = useDispatch();

  function handleOnclickEdit() {
    setShowReviewBox(true);
    dispatch(handleChangeSelectedReview(review));
  }

  function handleDelete() {
    if (deleteLoading || addLoading || loading) return;
    toast.loading(`${review?.merchant?.name} review Deleting...`, {
      id: "loading",
    });
    const response = dispatch(
      handleDeleteReview({
        token,
        id: review?.merchant?._id,
        signal: AbortControllerRef,
      })
    );
    if (response) {
      response.then((res) => {
        if (res?.payload?.success) {
          toast.remove("loading");
          toast.success("Review deleted successfully.");
          dispatch(handleChangeSelectedReview(null));
        }
      });
    }
  }

  return (
    <div className="space-y-2">
      <div className="w-full flex items-start gap-3">
        <Link to={`/details/${review?.merchant?._id}`}>
          <img
            src={BaseUrl.concat(review?.merchant?.images[0])}
            alt=""
            className="w-32 h-32 object-cover rounded-2xl"
          />
        </Link>
        <div className="space-y-1 ">
          <p className="font-semibold text-xl">{review?.merchant?.name}</p>
          <div className="w-full flex items-center gap-2">
            {new Array(review?.rating).fill("").map((rate, i) => (
              <AiFillStar key={i} className="text-yellow-500 w-6 h-6" />
            ))}
          </div>
          <p className="text-lg text-opacity-50 tracking-wide">
            {review?.comment}
          </p>
          <p className="text-sm text-textColor text-opacity-50">
            {moment(review?.updatedAt).format("LL")}
          </p>
          <div className="flex text-blueColor font-semibold text-lg items-center gap-5">
            <p className="cursor-pointer" onClick={() => handleOnclickEdit()}>
              Edit
            </p>
            <div className="inline-block relative">
              <button
                onClick={() => {
                  setShowDeleteBox(true);
                  dispatch(handleChangeSelectedReview(review));
                }}
              >
                Delete
              </button>
              {/* delete box */}
              {selectedReview?._id === review?._id && showDeleteBox && (
                <div className="absolute w-auto z-10 space-y-2 top-6 left-0 shadow-2xl bg-white  rounded-lg p-3 font-semibold text-lg">
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
                    <button
                      onClick={handleDelete}
                      className="text-red-500 hover:bg-red-100 transition-all p-1 text-opacity-60"
                    >
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
