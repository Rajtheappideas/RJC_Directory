import React, { useMemo, useRef, useState } from "react";
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
  const [beginAndEnd, setBeginAndEnd] = useState({
    isEnd: false,
    isBegin: true,
  });

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="container mx-auto xl:px-0 px-5 space-y-5">
      <div className="space-y-3">
        <p className="xl:text-[30px] text-2xl font-semibold title heading uppercase">
          Categories
        </p>
        <p className=" text-textColor font-medium text-opacity-50 xl:text-base text-sm w-11/12">
          Explore businesses effortlessly in your preferred category. Our
          directory simplifies your search, offering services, contact details,
          and reviews for quick and informed decision-making.
        </p>
      </div>
      <div className="relative">
        <Swiper
          // install Swiper modules
          onSlideChange={(e) => {
            setBeginAndEnd({
              isBegin: e.isBeginning,
              isEnd: e.isEnd,
            });
          }}
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={6}
          direction={"horizontal"}
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
            240: {
              slidesPerView: 2,
              spaceBetween: 10,
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
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {categoryData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="space-y-2">
                <img src={item?.image} alt="" className="w-full h-fit" />
                <p className="text-textColor font-semibold text-center xl:text-lg text-sm">
                  {item?.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {!beginAndEnd?.isBegin && (
          <div
            ref={prevRef}
            className="swiper-prev-button absolute top-[35%] active:-translate-x-1 transition-all -left-4 bg-white p-3 cursor-pointer shadow-lg rounded-full z-10"
          >
            <IoIosArrowBack className="text-[#007aff]" />
          </div>
        )}
        {!beginAndEnd?.isEnd && (
          <div
            ref={nextRef}
            className="swiper-next-button absolute top-[35%] active:translate-x-1 transition-all -right-4 bg-white shadow-xl p-3 cursor-pointer rounded-full z-10"
          >
            <IoIosArrowForward className="text-[#007aff]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
