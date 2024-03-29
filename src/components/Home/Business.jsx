import React, { memo, useRef, useState } from "react";
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
import { Link, useLocation } from "react-router-dom";
import SingleItemBox from "../SingleItemBox";
import { useSelector } from "react-redux";
import SkeletonLoading from "../SkeletonLoading";

const Business = () => {
  const [beginAndEnd, setBeginAndEnd] = useState({
    isEnd: false,
    isBegin: true,
  });

  const { nearByBusinessMerchantList, nearByBusinessMerchantLoading } =
    useSelector((s) => s.root.merchant);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { pathname } = useLocation();
  return (
    <div
      className={`container mx-auto space-y-5 xl:px-0 ${
        pathname.split("/")[1] === "" && "px-5"
      } lg:py-10`}
    >
      {nearByBusinessMerchantLoading ? (
        window.document.body.clientWidth < 600 ? (
          <SkeletonLoading
            width={window.document.body.clientWidth - 50}
            height={350}
            count={1}
          />
        ) : (
          <SkeletonLoading width={380} height={350} count={4} />
        )
      ) : (
        <>
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
              onSlideChange={(e) => {
                setBeginAndEnd({
                  isBegin: e.isBeginning,
                  isEnd: e.isEnd,
                });
              }}
              className="rounded-2xl"
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
              {nearByBusinessMerchantList.length > 0 &&
                nearByBusinessMerchantList.slice(0, 10).map((item) => (
                  <SwiperSlide key={item._id} className="py-5 px-1">
                    <SingleItemBox from="near" data={item} boxType="grid" />
                  </SwiperSlide>
                ))}
            </Swiper>
            <div
              ref={prevRef}
              className={`swiper-prev-button absolute top-[45%] active:-translate-x-1 transition-all -left-4 bg-white p-3 cursor-pointer shadow-lg rounded-full z-10 ${
                beginAndEnd?.isBegin && "scale-0"
              } `}
            >
              <IoIosArrowBack className="text-[#007aff] h-6 w-6" />
            </div>
            <div
              ref={nextRef}
              className={` absolute top-[45%] active:translate-x-1 transition-all -right-4 bg-white shadow-xl p-3 cursor-pointer rounded-full z-10 ${
                beginAndEnd?.isEnd && "scale-0"
              } `}
            >
              <IoIosArrowForward className="text-[#007aff] h-6 w-6" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Business);
