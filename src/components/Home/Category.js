import React, { useRef } from "react";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import "swiper/css/scrollbar";

const categoryData = [
  {
    id: 1,
    image: require("../../assets/images/cate_slider/Rectangle 374.png"),
    title: "Beauty",
  },
  {
    id: 2,
    image: require("../../assets/images/cate_slider/Rectangle 374 (1).png"),
    title: "Automobile",
  },
  {
    id: 3,
    image: require("../../assets/images/cate_slider/Rectangle 374 (2).png"),
    title: "Books",
  },
  {
    id: 4,
    image: require("../../assets/images/cate_slider/Rectangle 374 (3).png"),
    title: "Chemicals",
  },
  {
    id: 5,
    image: require("../../assets/images/cate_slider/Rectangle 374 (4).png"),
    title: "Electrical",
  },
  {
    id: 6,
    image: require("../../assets/images/cate_slider/Rectangle 374 (5).png"),
    title: "Restaurant",
  },
  {
    id: 7,
    image: require("../../assets/images/cate_slider/Rectangle 374.png"),
    title: "Beauty",
  },
  {
    id: 8,
    image: require("../../assets/images/cate_slider/Rectangle 374 (1).png"),
    title: "Automobile",
  },
];

const Category = () => {
  return (
    <div className="container mx-auto xl:px-0 px-5 space-y-5">
      <div className="space-y-1">
        <p className="xl:text-[30px] text-2xl font-semibold title heading uppercase">
          Categories
        </p>
        <p className="para_color xl:text-base text-sm">
          Explore businesses effortlessly in your preferred category. Our
          directory simplifies your search, offering services, contact details,
          and reviews for quick and informed decision-making.
        </p>
      </div>
      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          spaceBetween={30}
          className="relative"
          slidesPerView={6}
          navigation={{
            nextEl: ".swiper-next-button",
            prevEl: ".swiper-prev-button",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            425: {
              slidesPerView: 2,
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
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {categoryData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="space-y-2">
                <img src={item?.image} alt="" style={{ width: "100%" }} />
                <p className="text-[#272727] text-center xl:text-lg text-sm">
                  {item?.title}
                </p>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-prev-button absolute top-[35%] bg-white p-2 cursor-pointer shadow-lg rounded-full z-10">
            <IoIosArrowBack className="text-[#007aff]" />
          </div>
          <div className="swiper-next-button absolute top-[35%] right-0 bg-white shadow-lg p-2 cursor-pointer rounded-full z-20">
            <IoIosArrowForward className="text-[#007aff]" />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
