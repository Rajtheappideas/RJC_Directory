import React, { useEffect, useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import BaseUrl from "../BaseUrl";
import {
  handleAddAndEditReview,
  handleDeleteReview,
} from "../redux/ReviewSlice";
import useAbortApiCall from "../hooks/useAbortApiCall";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const WriteReviewModal = ({ setShowReviewBox }) => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const { selectedReview, deleteLoading, addLoading, loading } = useSelector(
    (s) => s.root.review
  );

  const { token } = useSelector((s) => s.root.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { abortApiCall, AbortControllerRef } = useAbortApiCall();

  function handleAddorEditreview() {
    if (deleteLoading || addLoading || loading) return;
    {
      toast.remove();
      if (comment.trim() === "" || rating === null)
        return toast.error("Please add rating & commnet.");
      const response = dispatch(
        handleAddAndEditReview({
          token,
          rating,
          comment,
          merchantId: selectedReview?.merchant?._id,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success) {
            toast.success(res?.payload?.message);
            setShowReviewBox(false)
          }
        });
      }
    }
  }

  useEffect(() => {
    if (token == null) {
      navigate("/sign-in");
    } else if (selectedReview?.comment && selectedReview?.rating) {
      setComment(selectedReview?.comment);
      setRating(selectedReview?.rating);
    }
    return () => abortApiCall();
  }, []);

  return (
    <>
      <div
        onClick={() => setShowReviewBox(false)}
        className="fixed w-screen h-screen bg-black/20 backdrop-blur-sm inset-0 z-20"
      ></div>
      <div className="bg-white p-6 rounded-lg  xl:w-1/3 md:w-1/2 w-10/12 flex items-center  justify-center gap-3 flex-col fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <img
          src={BaseUrl.concat(selectedReview?.merchant?.images[0])}
          className="w-20 h-20 rounded-full object-cover"
        ></img>
        <IoMdClose
          onClick={() => setShowReviewBox(false)}
          className="absolute top-3 right-3 text-black text-xl cursor-pointer"
        />
        <p className="text-center font-semibold text-2xl">
          {selectedReview?.merchant?.name}
        </p>
        <div className="flex items-center flex-wrap gap-2">
          {new Array(5).fill("").map((rate, i) => (
            <AiFillStar
              key={i + 1}
              className={` ${
                rating >= i + 1 ? "text-yellow-400" : "text-gray-200"
              } hover:text-yellow-400 cursor-pointer w-6 h-6  transition-all`}
              onMouseOver={(e) => {
                setRating(i + 1);
              }}
              // onMouseLeave={() => {
              //   setFillStarCount(selectedReview?.rating);
              // }}
              // onClick={() => {
              //   setFillStarCount(i + 1);
              //   console.log(i + 1);
              // }}
            />
          ))}
          {/* {new Array(selectedReview?.rating).fill("").map((rate, i) => (
            <AiFillStar key={i} className="text-yellow-500 w-6 h-6 hover:text-yellow-500 transition-all" />
          ))}
          {new Array(5 - selectedReview?.rating).fill("").map((rate, i) => (
            <AiFillStar
              key={i}
              className="text-gray-200 w-6 h-6 hover:text-yellow-500 transition-all"
            />
          ))} */}
        </div>
        <textarea
          name="review"
          id=""
          className="w-full rounded-lg p-2 min-h-[10rem] max-h-40 border outline-none"
          placeholder="Type here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          disabled={loading || addLoading || deleteLoading}
          className="green_button"
          onClick={handleAddorEditreview}
        >
          {addLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default WriteReviewModal;
