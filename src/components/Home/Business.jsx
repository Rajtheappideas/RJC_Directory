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
// import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import SingleItemBox from "../SingleItemBox";

const listingData = [
  {
    id: 1,
    image: require("../../assets/images/latest_slider/Rectangle 375.png"),
    title: "Home appliances repair",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "4.0 (58)",
  },
  {
    id: 2,
    image: require("../../assets/images/latest_slider/Rectangle 375 (1).png"),
    title: "Furniture dealer",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "2.0 (16)",
  },
  {
    id: 3,
    image: require("../../assets/images/latest_slider/Rectangle 375 (2).png"),
    title: "Pest control service",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "4.0 (116)",
  },
  {
    id: 4,
    image: require("../../assets/images/latest_slider/Rectangle 375 (3).png"),
    title: "Home appliances repair",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "3.0 (14)",
  },
  {
    id: 5,
    image: require("../../assets/images/latest_slider/Rectangle 375.png"),
    title: "Furniture dealer",
    des: "304 Kent St, Sydney NSW 2000.Austrakia",
    review: <GoStarFill />,
    rating: "4.0 (58)",
  },
];

const Business = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="container mx-auto space-y-5 xl:px-0 px-5 lg:py-10 ">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="xl:text-[30px] text-2xl font-semibold title heading uppercase">
            Near by <span className="text-[#023F86]">business</span>
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
          // pagination={{ clickable: true }}
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
            <SwiperSlide key={item.id}>
              <SingleItemBox data={item} boxType="grid" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={prevRef}
          className="swiper-prev-button absolute top-[35%] active:-translate-x-1 transition-all -left-4 bg-white p-3 cursor-pointer shadow-lg rounded-full z-10"
        >
          <IoIosArrowBack className="text-[#007aff]" />
        </div>
        <div
          ref={nextRef}
          className="swiper-next-button absolute top-[35%] active:translate-x-1 transition-all -right-4 bg-white shadow-xl p-3 cursor-pointer rounded-full z-10"
        >
          <IoIosArrowForward className="text-[#007aff]" />
        </div>
      </div>
    </div>
  );
};

export default Business;
