import React, { useRef } from "react";
import Bestoffer from "../components/Bestoffer";
import Business from "../components/Home/Business";
import NewLetter from "../components/NewLetter";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Autoplay, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import BaseUrl from "../BaseUrl";

const BestOffers = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { offerBanners, offerBannerLoading } = useSelector((s) => s.root.cms);

  return (
    <>
      <Helmet>
        <title>Offers - RJC Directory</title>
      </Helmet>
      <div className="w-full">
        <div className="px-3 relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
              enabled: true,
            }}
            loop={true}
            speed={1500}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            observer={true}
            parallax={true}
            observeParents={true}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {offerBannerLoading ? (
              <div className="loading">Loading....</div>
            ) : offerBanners.length > 0 ? (
              offerBanners.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={BaseUrl?.concat(item?.image)}
                    alt={item?.imageAlt}
                    className="w-screen md:h-[60vh] h-[40vh] object-fill"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))
            ) : (
              <div>NO banners</div>
            )}
          </Swiper>
          <div
            ref={prevRef}
            className="absolute top-1/2 -translate-y-1/2 xl:left-20 lg:left-10 left-5 bg-white p-2 cursor-pointer shadow-lg rounded-full z-10"
          >
            <IoIosArrowBack className="text-[#007aff]" />
          </div>
          <div
            ref={nextRef}
            className=" absolute top-1/2 -translate-y-1/2 xl:right-20 lg:right-10 right-5 bg-white shadow-lg p-2 cursor-pointer rounded-full z-20"
          >
            <IoIosArrowForward className="text-[#007aff]" />
          </div>
        </div>
        <div className="container md:py-10 py-5 w-full mx-auto xl:px-0 md:px-10 px-5 lg:space-y-14 space-y-7">
          <Bestoffer />
          <Business />
        </div>
        <NewLetter />
      </div>
    </>
  );
};

export default BestOffers;
