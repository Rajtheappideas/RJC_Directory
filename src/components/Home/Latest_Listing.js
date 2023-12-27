import React, { useRef } from "react";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GoStarFill } from "react-icons/go";
import { FcLike } from "react-icons/fc";

import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const listingData = [
  {
    id: 1,
    image: require("../../assets/images/latest_slider/Rectangle 375.png"),
    title: "Meu Jardim Sydney",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "4.0 (58)",
  },
  {
    id: 2,
    image: require("../../assets/images/latest_slider/Rectangle 375 (1).png"),
    title: "Cafe Everbean",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "2.0 (16)",
  },
  {
    id: 3,
    image: require("../../assets/images/latest_slider/Rectangle 375 (2).png"),
    title: "Hocco Eatery",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "4.0 (116)",
  },
  {
    id: 4,
    image: require("../../assets/images/latest_slider/Rectangle 375 (3).png"),
    title: "Domino's Pizza",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "3.0 (14)",
  },
  {
    id: 5,
    image: require("../../assets/images/latest_slider/Rectangle 375.png"),
    title: "Meu Jardim Sydney",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "4.0 (58)",
  },
];

const Latest_Listing = () => {
  return (
    <div className="container mx-auto xl:px-0 px-5 xl:py-10 space-y-5">
      <div className="space-y-1">
        <p className="xl:text-[30px] text-2xl font-semibold title heading uppercase">
          Latest <span className="text-[#023F86]">listings</span>
        </p>
      </div>
      <div className="px-3">
        <Swiper
          style={{ height: "350px" }}
          // install Swiper modules
          modules={[Navigation]}
          className="relative"
          spaceBetween={30}
          slidesPerView={4}
          navigation={{
            nextEl: ".swiper-next-button",
            prevEl: ".swiper-prev-button",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            425: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {listingData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="space-y-2 bg-white rounded-2xl shadow-md">
                <div>
                  <img
                    src={item?.image}
                    alt=""
                    style={{ width: "100%", position: "relative" }}
                  />
                  <FcLike className="absolute top-3 right-2 cursor-pointer text-2xl" />
                </div>
                <div className="space-y-2 p-3">
                  <p className="text-[#272727] text-left font-semibold xl:text-xl text-base">
                    {item?.title}
                  </p>
                  <p className="text-[#222] font-normal xl:text-base text-sm">
                    {item?.des}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="text-[#FFCC00]">{item?.review}</div>
                    <div className="text-base">{item?.rating}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-prev-button absolute top-[35%] bg-white p-2 cursor-pointer shadow-lg rounded-full z-10">
            <IoIosArrowBack className="text-[#007aff]"/>
          </div>
          <div className="swiper-next-button absolute top-[35%] right-0 bg-white shadow-lg p-2 cursor-pointer rounded-full z-20">
            <IoIosArrowForward className="text-[#007aff]"/>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Latest_Listing;
