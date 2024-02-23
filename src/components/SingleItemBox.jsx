import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";
import { RiHeartFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleAddFav, handleRemoveFav } from "../redux/MerchantSlice";
import useAbortApiCall from "../hooks/useAbortApiCall";
import toast from "react-hot-toast";
import BaseUrl from "../BaseUrl";

const SingleItemBox = ({ data, boxType, from }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [addFavLoading, setAddFavLoading] = useState(false);
  const [removeFavLoading, setRemoveFavLoading] = useState(false);

  const { token } = useSelector((s) => s.root.auth);
  const { favRemoveLoading, favAddLoading } = useSelector(
    (s) => s.root.merchant
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { AbortControllerRef } = useAbortApiCall();

  const handleAddAndRemoveFav = () => {
    if (!token) return navigate("/sign-in");
    if (data?.isFavourite) {
      if (removeFavLoading) return;
      setRemoveFavLoading(true);
      toast.loading(`${data?.name} Removing from favourites. `, {
        id: "loading",
      });
      const response = dispatch(
        handleRemoveFav({
          token,
          id: data?._id,
          from,
          signal: AbortControllerRef,
        })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success) {
            toast.success(`${data?.name} Removed from favourites. `);
            toast.remove("loading");
            // setIsFavourite((prev) => !prev);
            // setIsFavourite(false);
            setRemoveFavLoading(false);
          } else {
            toast.remove("loading");
            setRemoveFavLoading(false);
          }
        });
      }
    } else {
      if (addFavLoading) return;
      setAddFavLoading(true);
      toast.loading(`${data?.name} Adding to favourites. `, { id: "loading" });
      const response = dispatch(
        handleAddFav({ token, id: data?._id, from, signal: AbortControllerRef })
      );
      if (response) {
        response.then((res) => {
          if (res?.payload?.success) {
            toast.success(`${data?.name} Added to favourites.`);
            toast.remove("loading");
            // setIsFavourite(true);
            setAddFavLoading(false);
          } else {
            toast.remove("loading");
            setAddFavLoading(false);
          }
        });
      }
    }
  };
  // console.log(favRemoveLoading, data?._id, favAddLoading);

  useEffect(() => {
    if (data?.isFavourite) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [favRemoveLoading, favAddLoading]);

  return (
    <>
      {boxType === "grid" ? (
        <div
          className={`w-full relative md:min-h-[27rem] md:max-h-[27rem] rounded-2xl border select-none bg-white shadow-[0px_3px_7px_rgba(0,0,0,0.20)]`}
        >
          {/* heart icon */}
          <div
            onClick={() => {
              handleAddAndRemoveFav();
            }}
            className={`absolute top-3 right-3 ${
              isFavourite ? "bg-red-500" : " border border-white"
            } rounded-2xl p-2 cursor-pointer`}
          >
            {isFavourite ? (
              <RiHeartFill className="text-white text-3xl " />
            ) : (
              <IoHeartOutline className="text-white text-3xl" />
            )}
          </div>
          <Link to={`/details/${data?._id}`}>
            <img
              src={BaseUrl.concat(data?.images[0])}
              alt=""
              className="object-cover w-full h-60 rounded-tl-2xl rounded-tr-2xl"
              loading="lazy"
            />
          </Link>
          <div className="md:space-y-3 space-y-2 md:p-3 p-2">
            <p className="font-semibold text-left md:text-2xl text-xl">
              {data?.name}
            </p>
            <p className="font-medium text-left text-lg text-textColor line-clamp-2">
              {data?.address}, {data?.city}. {data?.country}
            </p>
            <p className="flex items-center gap-2 font-medium md:text-lg text-textColor">
              <AiFillStar className="text-yellow-400 text-2xl" />
              <span>
                {data?.avgRating} ({data?.totalRating})
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex md:flex-nowrap flex-wrap gap-3 md:justify-between justify-center items-start rounded-lg border select-none bg-bgGray p-3 md:py-5 py-3">
          {/* heart icon */}
          <div className="flex items-start gap-2 flex-wrap">
            <Link to="/details">
              <img
                src={BaseUrl.concat(data?.images[0])}
                alt=""
                className="object-cover md:w-52 md:h-52 w-full h-44 rounded-lg"
                loading="lazy"
              />
            </Link>
            <div className="space-y-3 md:p-3 p-2">
              <p className="font-semibold text-left md:text-2xl text-lg">
                {data?.name}
              </p>
              <p className="font-medium text-left text-lg">
                {data?.address}, {data?.city}. {data?.country}
              </p>
              <p className="flex items-center gap-2 font-medium text-lg">
                <AiFillStar className="text-yellow-400 text-xl" />
                <span>
                  {data?.avgRating} ({data?.totalRating})
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="bg-greenColor text-white flex items-center justify-center gap-2 text-center rounded-3xl py-3 w-40 font-semibold cursor-pointer text-base">
              <FaPhoneAlt className="text-2xl" />
              <span>Call</span>
            </p>
            <div
              onClick={() => handleAddAndRemoveFav()}
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
