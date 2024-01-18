import React from "react";
import FindProduct from "./FindProduct";
import Header from "../Header";

const Banner = () => {
  return (
    <div className="w-full relative h-[80vh] 2xl:h-[75vh] ">
      <div className="">
        <img
          src={require("../../assets/images/banner.png")}
          alt="banner"
          className="absolute brightness-[.8] object-cover w-full h-full"
        />
      </div>
      <div className="flex justify-center items-center h-full w-full">
        <FindProduct />
      </div>
    </div>
  );
};

export default Banner;
