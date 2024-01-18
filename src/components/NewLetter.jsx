import React from "react";
import { CiMail } from "react-icons/ci";

const NewLetter = () => {
  return (
    <div
      className="bg-[#004D7F] lg:py-16 py-5 p-5 relative text-center  text-black lg:space-y-5 space-y-2"
      style={{
        backgroundImage: "url(./newlatter.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <p className="lg:text-3xl  text-lg text-white font-bold">
            Subscribe our newsletter
          </p>
          <p className="text-white text-base">Subscribe for get update info</p>
        </div>
        <div>
          <div className="bg-white border border-[#2588C9] rounded-full flex mx-auto justify-around items-center flex-row lg:w-[40%] md:w-2/3 w-full px-2 py-2">
            <div className="gap-3 flex md:justify-between justify-center  items-center w-full ">
              <div className="flex gap-3 flex-1 pl-3">
                <CiMail className="text-3xl" />
                <input
                  type="text"
                  placeholder="Your Email Address"
                  className="outline-none text-sm w-full"
                />
              </div>
              <button type="submit" className="darkBlue_button md:flex-none w-fit">
                Subscirbe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLetter;
