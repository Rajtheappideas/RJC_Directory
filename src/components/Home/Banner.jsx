import React from "react";
import FindProduct from "./FindProduct";

const Banner = () => {
  return (
    <div className="w-full relative h-[80vh] 2xl:h-[75vh] ">
      <div>
        <img
          src={require("../../assets/images/banner.png")}
          alt="banner"
          className="absolute brightness-[.8] object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="flex justify-center items-center h-full w-full">
        <FindProduct />
      </div>
    </div>
  );
};

export default Banner;
