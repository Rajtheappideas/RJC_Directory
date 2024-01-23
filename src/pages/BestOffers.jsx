import React, { useRef } from "react";
import Bestoffer from "../components/Bestoffer";
import Business from "../components/Home/Business";
import NewLetter from "../components/NewLetter";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper coBestoffersre and required modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import SingleItemBox from "../components/SingleItemBox";
import { Autoplay, Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoStarFill } from "react-icons/go";
import { Helmet } from "react-helmet";

const BestOffers = () => {
  const offers = new Array(5);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
            // pagination={{ clickable: true }}
          >
            {offers.fill(5).map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={require("../assets/images/home_slider_desktop_Web-Banner-bbq-dec 1.png")}
                  alt=""
                  className="w-full h-80 object-cover"
                />
                {/* <SingleItemBox data={item} boxType="grid" /> */}
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            ref={prevRef}
            className="absolute top-[40%] left-20 bg-white p-2 cursor-pointer shadow-lg rounded-full z-10"
          >
            <IoIosArrowBack className="text-[#007aff]" />
          </div>
          <div
            ref={nextRef}
            className=" absolute top-[40%] right-20 bg-white shadow-lg p-2 cursor-pointer rounded-full z-20"
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
