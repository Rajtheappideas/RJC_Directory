import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosMail } from "react-icons/io";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaFacebook } from "react-icons/fa6";
import Business from "../components/Home/Business";
import { AiFillStar } from "react-icons/ai";
import NewLetter from "../components/NewLetter";
import WriteReview from "../components/WriteReview";

const ItemDetails = () => {
  const [showReviewBox, setShowReviewBox] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-full">
      {showReviewBox && <WriteReview setShowReviewBox={setShowReviewBox} />}
      <div className="bg-white p-10 container xl:px-0 md:px-10 px-5 mx-auto lg:space-y-14 space-y-7">
        {/* image & info */}
        <div className="w-full grid xl:grid-cols-2 gap-5 place-items-start items-start">
          <img
            src={require("../assets/images/business_slider/Rectangle 375.png")}
            alt=""
            className="w-full h-full rounded-3xl object-cover object-center"
          />
          <div className="space-y-3 w-full">
            <p className="font-semibold md:text-5xl text-3xl">TAO Restaurant</p>
            <p className="text-blueColor text-left text-lg">
              Restaurant / Italian restaurant
            </p>
            <p className="flex items-center gap-2">
              <MdLocationPin className="text-3xl" />
              <span>304 Kent St, New York NSW 2000., USA</span>
            </p>
            <div className="flex items-center gap-2">
              <p className="bg-green-600 w-20 text-white p-2 rounded-lg text-center">
                open
              </p>
              <p className="flex items-center gap-2">
                Closes 11:30 PM <IoIosArrowDown className="text-xl" />
              </p>
            </div>
            <div className="md:pl-24 pl-6 text-lg w-full space-y-2">
              <table className="md:w-2/3 w-full">
                <tbody className="w-full">
                  <tr className="w-full text-textColor font-medium text-opacity-40">
                    <td className="w-1/2">Sunday</td>
                    <td>Closed</td>
                  </tr>
                  <tr className="w-full font-semibold">
                    <td className="w-1/2 pt-3">Monday</td>
                    <td>09:00 AM - 11:30 PM</td>
                  </tr>
                  <tr className="w-full text-textColor font-medium text-opacity-40">
                    <td className="w-1/2 pt-3">Tuesday</td>
                    <td>09:00 AM - 11:30 PM</td>
                  </tr>
                  <tr className="w-full text-textColor font-medium text-opacity-40">
                    <td className="w-1/2 pt-3">Wednesday</td>
                    <td>09:00 AM - 11:30 PM</td>
                  </tr>
                  <tr className="w-full text-textColor font-medium text-opacity-40">
                    <td className="w-1/2 pt-3">Thursday</td>
                    <td>09:00 AM - 11:30 PM</td>
                  </tr>
                  <tr className="w-full text-textColor font-medium text-opacity-40">
                    <td className="w-1/2 pt-3">Friday</td>
                    <td>09:00 AM - 11:30 PM</td>
                  </tr>
                  <tr className="w-full text-textColor font-medium text-opacity-40">
                    <td className="w-1/2 pt-3">Saturday</td>
                    <td>09:00 AM - 11:30 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center md:flex-row flex-col gap-3 w-full">
              <div className="md:w-1/2 w-full">
                <button className="green_button w-full flex items-center gap-2">
                  <FaPhoneAlt className="text-2xl text-white" />
                  <span>+1 123456789</span>
                </button>
              </div>
              <div className="md:w-1/2 w-full">
                <button className="blue_button w-full flex items-center justify-start gap-2">
                  <MdEmail className="text-white min-w-[1.5rem]" />
                  <a href="mailto:loremipsum@gmail.com" className="">
                    loremipsum@gmail.com
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* offers */}
        <div className="w-full space-y-2">
          <p className="font-semibold text-3xl">Offers</p>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
            <div className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <p className="text-xl font-semibold">EPIC DEAL ON PIZZAS</p>
              <p className="font-medium text-lg">Buy 1 Get 1 Free</p>
            </div>
            <div className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <p className="text-xl font-semibold">EPIC DEAL ON PIZZAS</p>
              <p className="font-medium text-lg">Buy 1 Get 1 Free</p>
            </div>
            <div className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <p className="text-xl font-semibold">EPIC DEAL ON PIZZAS</p>
              <p className="font-medium text-lg">Buy 1 Get 1 Free</p>
            </div>
            <div className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <p className="text-xl font-semibold">EPIC DEAL ON PIZZAS</p>
              <p className="font-medium text-lg">Buy 1 Get 1 Free</p>
            </div>
            <div className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <p className="text-xl font-semibold">EPIC DEAL ON PIZZAS</p>
              <p className="font-medium text-lg">Buy 1 Get 1 Free</p>
            </div>
            <div className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <p className="text-xl font-semibold">EPIC DEAL ON PIZZAS</p>
              <p className="font-medium text-lg">Buy 1 Get 1 Free</p>
            </div>
            <div className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <p className="text-xl font-semibold">EPIC DEAL ON PIZZAS</p>
              <p className="font-medium text-lg">Buy 1 Get 1 Free</p>
            </div>
            <div className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50">
              <p className="text-xl font-semibold">EPIC DEAL ON PIZZAS</p>
              <p className="font-medium text-lg">Buy 1 Get 1 Free</p>
            </div>
          </div>
        </div>
        {/* social media */}
        <div className="space-y-2">
          <p className="font-semibold text-3xl">Social media</p>
          <div className="flex items-center gap-2 flex-wrap">
            <img
              src={require("../assets/images/facebook.png")}
              alt=""
              className="md:w-20 md:h-20 h-10 w-10"
            />
            <img
              src={require("../assets/images/instagram.png")}
              alt=""
              className="md:w-20 md:h-20 h-10 w-10"
            />
            <div className="bg-black rounded-full flex items-center justify-center md:h-20 md:w-20 w-10 h-10">
              <img
                src={require("../assets/images/Vector.png")}
                alt=""
                className="md:w-10 h-5 md:h-10 w-5"
              />
            </div>
            <img
              src={require("../assets/images/youtube.png")}
              alt=""
              className="md:w-20 md:h-20 h-10 w-10"
            />
          </div>
        </div>
        {/* map & gallery */}
        <div className="w-full grid lg:grid-cols-2  gap-3">
          <p className="font-semibold text-3xl">Map</p>
          <p className="font-semibold text-3xl lg:block hidden">Gallery</p>
          <div className="w-full h-full bg-gray-200 rounded-2xl">
            <img
              src={require("../assets/images/map.png")}
              alt=""
              className="w-full h-full rounded-2xl"
            />
          </div>
          <p className="font-semibold text-3xl lg:hidden">Gallery</p>

          <div className="w-full grid grid-cols-3 gap-2">
            <img
              src={require("../assets/images/business_slider/Rectangle 375.png")}
              alt=""
              className="w-full h-full rounded-2xl"
            />
            <img
              src={require("../assets/images/business_slider/Rectangle 375.png")}
              alt=""
              className="w-full h-full rounded-2xl"
            />
            <img
              src={require("../assets/images/business_slider/Rectangle 375.png")}
              alt=""
              className="w-full h-full rounded-2xl"
            />
            <img
              src={require("../assets/images/business_slider/Rectangle 375.png")}
              alt=""
              className="w-full h-full rounded-2xl"
            />
            <img
              src={require("../assets/images/business_slider/Rectangle 375.png")}
              alt=""
              className="w-full h-full rounded-2xl"
            />
            <img
              src={require("../assets/images/business_slider/Rectangle 375.png")}
              alt=""
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
        {/* rating */}
        <div className="space-y-3 w-full">
          <p className="font-semibold text-3xl">Rating and reviews</p>

          <div className="w-full items-center flex justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-5xl">4.0</span>
              <AiFillStar className="text-yellow-500  text-3xl" />
            </div>
            <div>
              <button
                className="green_button"
                onClick={() => setShowReviewBox(true)}
              >
                write review
              </button>
            </div>
          </div>
          <p className="text-lg text-textColor text-opacity-50">
            24 ratings and 4 reviews
          </p>
          <div className="w-full">
            <div className="flex items-start md:gap-5 gap-3">
              <div className="bg-gray-200 rounded-full p-7"></div>
              <div className="space-y-1">
                <div className="w-full flex items-center gap-2 justify-between">
                  <div>
                    <p className="font-semibold text-2xl">Ellen McLaughlin</p>
                    <p className="font-medium text-base">2 hour ago</p>
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                  </div>
                </div>
                <p className="font-medium text-lg text-textColor text-opacity-50  tracking-wide">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati adipisci amet eligendi sed iusto accusantium iure
                  fuga harum ipsum alias fugiat perspiciatis, minima maxime
                  voluptates. Ipsam ullam harum sequi nostrum?
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-start md:gap-5 gap-3">
              <div className="bg-gray-200 rounded-full p-7"></div>
              <div className="space-y-1">
                <div className="w-full flex items-center gap-2 justify-between">
                  <div>
                    <p className="font-semibold text-2xl">Ellen McLaughlin</p>
                    <p className="font-medium text-base">2 hour ago</p>
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                  </div>
                </div>
                <p className="font-medium text-lg text-textColor text-opacity-50  tracking-wide">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati adipisci amet eligendi sed iusto accusantium iure
                  fuga harum ipsum alias fugiat perspiciatis, minima maxime
                  voluptates. Ipsam ullam harum sequi nostrum?
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-start md:gap-5 gap-3">
              <div className="bg-gray-200 rounded-full p-7"></div>
              <div className="space-y-1">
                <div className="w-full flex items-center gap-2 justify-between">
                  <div>
                    <p className="font-semibold text-2xl">Ellen McLaughlin</p>
                    <p className="font-medium text-base">2 hour ago</p>
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                    <AiFillStar className="text-yellow-500 text-lg" />
                  </div>
                </div>
                <p className="font-medium text-lg text-textColor text-opacity-50  tracking-wide">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati adipisci amet eligendi sed iusto accusantium iure
                  fuga harum ipsum alias fugiat perspiciatis, minima maxime
                  voluptates. Ipsam ullam harum sequi nostrum?
                </p>
              </div>
            </div>
          </div>

          {/* load more */}
          <div className=" w-full text-right">
            <button className="darkBlue_button">Load more</button>
          </div>
        </div>
        {/* business */}
        <Business />
      </div>
      {/* news letter */}
      <NewLetter />
    </div>
  );
};

export default ItemDetails;
