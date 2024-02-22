import React, { useMemo, useRef, useState } from "react";
// import Swiper core and required modules
import { Navigation } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import BaseUrl from "../../BaseUrl";
import { handleChangeSearchParams } from "../../redux/MerchantSlice";
import { useNavigate } from "react-router-dom";
import SkeletonLoading from "../SkeletonLoading";

const Category = () => {
  const [beginAndEnd, setBeginAndEnd] = useState({
    isEnd: false,
    isBegin: true,
  });

  const { categories, categoryLoading } = useSelector((s) => s.root.global);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      {!categoryLoading ? (
        <SkeletonLoading height={200} width={230} count={6} />
      ) : (
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
            {categories.length > 0 &&
              categories.map((item) => (
                <SwiperSlide key={item._id}>
                  <div
                    onClick={() => {
                      dispatch(
                        handleChangeSearchParams({
                          category: item?._id,
                        })
                      );
                      navigate("/search");
                    }}
                    className="space-y-2 w-full cursor-pointer"
                  >
                    <img
                      src={BaseUrl.concat(item?.image)}
                      loading="lazy"
                      alt=""
                      className="min-w-full h-40 rounded-lg"
                    />
                    <p className="text-textColor font-semibold text-center xl:text-lg text-sm">
                      {item?.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            {categories.length > 0 &&
              categories.map((item) => (
                <SwiperSlide key={item._id}>
                  <div
                    onClick={() => {
                      dispatch(
                        handleChangeSearchParams({
                          category: item?._id,
                        })
                      );
                      navigate("/search");
                    }}
                    className="space-y-2 w-full cursor-pointer"
                  >
                    {" "}
                    <img
                      src={BaseUrl.concat(item?.image)}
                      loading="lazy"
                      alt=""
                      className="min-w-full h-40 rounded-lg"
                    />
                    <p className="text-textColor font-semibold text-center xl:text-lg text-sm">
                      {item?.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <div
            ref={prevRef}
            className={`swiper-prev-button absolute top-[35%] active:-translate-x-1 transition-all -left-4 bg-white p-3 cursor-pointer shadow-lg rounded-full z-10 ${
              beginAndEnd?.isBegin && "scale-0"
            } `}
          >
            <IoIosArrowBack className="text-[#007aff]" />
          </div>
          <div
            ref={nextRef}
            className={` absolute top-[35%] active:translate-x-1 transition-all -right-4 bg-white shadow-xl p-3 cursor-pointer rounded-full z-10 ${
              beginAndEnd?.isEnd && "scale-0"
            } `}
          >
            <IoIosArrowForward className="text-[#007aff]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
