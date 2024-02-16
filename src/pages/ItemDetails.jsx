import React, { lazy, useEffect, useState } from "react";
import Business from "../components/Home/Business";
import NewLetter from "../components/NewLetter";
import WriteReviewModal from "../components/WriteReviewModal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleGetMerchantById } from "../redux/MerchantSlice";

const Rating = lazy(() => import("../components/MerchantDetails/Rating"));
const MapAndGallery = lazy(() =>
  import("../components/MerchantDetails/MapAndGallery")
);
const SocialMedia = lazy(() =>
  import("../components/MerchantDetails/SocialMedia")
);
const Offers = lazy(() => import("../components/MerchantDetails/Offers"));
const ImageAndInfo = lazy(() =>
  import("../components/MerchantDetails/ImageAndInfo")
);

const ItemDetails = () => {
  const [showReviewBox, setShowReviewBox] = useState(false);

  const { merchantByIdLoading, merchantDetails } = useSelector(
    (s) => s.root.merchant
  );
  const { addLoading } = useSelector((s) => s.root.review);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetMerchantById({ id }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, addLoading]);

  return (
    <div className="w-full">
      {showReviewBox && (
        <WriteReviewModal setShowReviewBox={setShowReviewBox} />
      )}
      {merchantByIdLoading ? (
        <div className="loading h-screen">Loading...</div>
      ) : (
        <div className="bg-white p-10 container xl:px-0 md:px-10 px-5 mx-auto lg:space-y-14 space-y-7">
          <ImageAndInfo />
          <Offers />
          <SocialMedia />
          <MapAndGallery />
          <Rating setShowReviewBox={setShowReviewBox} />
          <Business />
        </div>
      )}
      <NewLetter />
    </div>
  );
};

export default ItemDetails;
