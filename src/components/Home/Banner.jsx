import React from "react";
import FindProduct from "./FindProduct";
import Header from "../Header";

const Banner = () => {
  return (
    <div className="w-full relative h-[88vh] 2xl:h-[75vh] ">
      <div className="">
        <img
          src={require("../../assets/images/banner.png")}
          alt="banner"
          className="absolute brightness-[.8] object-cover w-full 2xl:h-[75vh]  h-[90vh]"
        />
      </div>
      <div className="flex  justify-center items-center 2xl:h-[80vh] h-[100vh] w-full">
        <FindProduct />
      </div>
    </div>
  );
};

export default Banner;
