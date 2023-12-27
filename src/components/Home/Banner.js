import React from "react";
import FindProduct from "./FindProduct";
import Header from "../Header";

const Banner = () => {
  return (
    <div
      // style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover", filter: "brightness(1.75)" }}
      className="w-full relative h-[88vh] 2xl:h-[75vh] "
    >
      {/* {loading ? (
        <div className="flex justify-center mx-auto mt-28 w-64">
          <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>
      ) : banner ? ( */}
        <div className="">
          <img
            src={require("../../assets/images/banner.png")}
            alt="banner"
            autoPlay
            loop
            muted
            className="absolute brightness-[.8] object-cover w-full 2xl:h-[75vh]  h-[90vh]"
            // style={{ backgroundColor: "#000" }}
          />
        </div>
      {/* ) : (
        <div className="flex justify-center items-center mt-28">No Banner</div>
      )} */}
      <Header/>
      <div className="flex  justify-center items-center 2xl:h-[80vh] h-[100vh] w-full">
        <FindProduct/>
      </div>

      
    </div>
  );
};

export default Banner;
