import React, { useRef, useState } from "react";
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
import { Link } from "react-router-dom";
import SingleItemBox from "../SingleItemBox";

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

const LatestListing = () => {
  const [beginAndEnd, setBeginAndEnd] = useState({
    isEnd: false,
    isBegin: true,
  });

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="container mx-auto xl:px-0 px-5 xl:py-20 md:py-10 py-5 space-y-5">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="xl:text-[30px] text-2xl font-semibold title heading uppercase">
            Latest <span className="text-[#023F86]">listings</span>
          </p>
          <div className="flex items-center gap-1">
            <Link
              to="/search"
              className="text-primary_color hover:underline cursor-pointer"
            >
              More
            </Link>
            <IoIosArrowForward className="text-primary_color" />
          </div>
        </div>
      </div>
      <div className="relative">
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          onSlideChange={(e) => {
            setBeginAndEnd({
              isBegin: e.isBeginning,
              isEnd: e.isEnd,
            });
          }}
          className="relative"
          spaceBetween={30}
          slidesPerView={4}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
            enabled: true,
          }}
          observer={true}
          parallax={true}
          observeParents={true}
          onSwiper={(swiper) => {
            // Delay execution for the refs to be defined
            setTimeout(() => {
              // Override prevEl & nextEl now that refs are defined
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              // Re-init navigation
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {listingData.map((item) => (
            <SwiperSlide key={item.id} className="py-5 px-1">
              <SingleItemBox data={item} boxType="grid" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={prevRef}
          className={`swiper-prev-button absolute top-[45%] active:-translate-x-1 transition-all -left-4 bg-white p-3 cursor-pointer shadow-lg rounded-full z-10 ${
            beginAndEnd?.isBegin && "opacity-0"
          } `}
        >
          <IoIosArrowBack className="text-[#007aff] h-6 w-6" />
        </div>
        <div
          ref={nextRef}
          className={` absolute top-[45%] active:translate-x-1 transition-all -right-4 bg-white shadow-xl p-3 cursor-pointer rounded-full z-10 ${
            beginAndEnd?.isEnd && "opacity-0"
          } `}
        >
          <IoIosArrowForward className="text-[#007aff] w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default LatestListing;
