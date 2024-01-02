import React from "react";

const Download = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 container justify-center mx-auto xl:px-0 px-5 lg:py-20 py-10 gap-5 items-center">
      <div className="flex justify-center items-center">
        <img src={require("../../assets/images/Group 39058.png")} alt="" className="w-[200px] h-[255px] lg:w-[342px]  lg:h-[455px]"/>
      </div>
      <div className="md:space-y-6 space-y-2">
        <p className="md:text-3xl text-lg font-semibold">
          Download Now for Seamless Business Discoveries on the Go!
        </p>
        <p className="text-textColor md:text-base text-sm">
          Download our business directory app now for instant access to a
          diverse range of local services. Discover businesses effortlessly,
          explore services, and access contact details on-the-go. Simplify your
          decision-making process with user reviews and ratings, making it easy
          to find the right businesses tailored to your needs.
        </p>
        <div className="flex gap-3">
          <img src={require("../../assets/images/playstore.png")} alt="" className="cursor-pointer md:w-auto w-[110px]"/>
          <img src={require("../../assets/images/appstore2.png")} alt="" className="cursor-pointer md:w-auto w-[110px]"/>
        </div>
      </div>
    </div>
  );
};

export default Download;
