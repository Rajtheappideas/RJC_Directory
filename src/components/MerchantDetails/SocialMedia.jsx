import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SocialMedia = () => {
  const { merchantDetails } = useSelector((s) => s.root.merchant);

  return (
    <div className="space-y-2">
      <p className="font-semibold text-3xl">Social media</p>
      <div className="flex items-center gap-2 flex-wrap">
        <Link to={`${merchantDetails?.facebook}`} target="_blank">
          <img
            loading="lazy"
            src={require("../../assets/images/facebook.png")}
            alt="facebook"
            className="md:w-20 md:h-20 h-10 w-10"
          />
        </Link>
        <Link to={`${merchantDetails?.instagram}`} target="_blank">
          <img
            loading="lazy"
            src={require("../../assets/images/instagram.png")}
            alt="instagram"
            className="md:w-20 md:h-20 h-10 w-10"
          />
        </Link>
        <Link to={`${merchantDetails?.twitter}`} target="_blank">
          <div className="bg-black rounded-full flex items-center justify-center md:h-20 md:w-20 w-10 h-10">
            <img
              loading="lazy"
              src={require("../../assets/images/Vector.png")}
              alt="twitter"
              className="md:w-10 h-5 md:h-10 w-5"
            />
          </div>
        </Link>
        <Link to={`${merchantDetails?.youtube}`} target="_blank">
          <img
            loading="lazy"
            src={require("../../assets/images/youtube.png")}
            alt="youtube"
            className="md:w-20 md:h-20 h-10 w-10"
          />
        </Link>
      </div>
    </div>
  );
};

export default SocialMedia;
