import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Parallax } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

// import Swiper core and required modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const testimonialData = [
  {
    id: 1,
    image: require("../../assets/images/img.png"),
    title: "Katerina Petrova",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Tellus posuere in leo ipsum ornare hendrerit. Vitaesollicitudin consectetur ultricies nec. Sed faucibus diam,penatibus lectus accumsan pellentesque nunc, nibh. Urnaaliquam tempus faucibus dolor.",
  },
  {
    id: 2,
    image: require("../../assets/images/img.png"),
    title: "Katerina Petrova",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Tellus posuere in leo ipsum ornare hendrerit. Vitaesollicitudin consectetur ultricies nec. Sed faucibus diam,penatibus lectus accumsan pellentesque nunc, nibh. Urnaaliquam tempus faucibus dolor.",
  },
  {
    id: 3,
    image: require("../../assets/images/img.png"),
    title: "Katerina Petrova",
    des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Tellus posuere in leo ipsum ornare hendrerit. Vitaesollicitudin consectetur ultricies nec. Sed faucibus diam,penatibus lectus accumsan pellentesque nunc, nibh. Urnaaliquam tempus faucibus dolor.",
  },
];

const TestiMonials = () => {
  const [beginAndEnd, setBeginAndEnd] = useState({
    isEnd: false,
    isBegin: true,
  });
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="container mx-auto xl:px-2 px-5 space-y-5">
      <div className="space-y-1 text-center">
        <div className=" mx-auto">
          <p className="xl:text-[30px] text-2xl text-center  font-semibold line heading2 capitalize">
            User’s <span className="text-[#023F86]">Testimonials</span>
          </p>
        </div>
      </div>
      <div className="relative md:px-10">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Parallax]}
          onSlideChange={(e) => {
            setBeginAndEnd({
              isBegin: e.isBeginning,
              isEnd: e.isEnd,
            });
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.update();
          }}
          direction={"horizontal"}
          spaceBetween={10}
          slidesPerView={1}
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
              // swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
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
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
        >
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="border bottom-2 lg:p-14 p-3 rounded-2xl shadow-lg">
                <div className="space-y-3 text-center">
                  <img src={item?.image} alt="" className="mx-auto" />
                  <p className="xl:text-xl text-base">{item?.title}</p>
                  <div className="space-y-4">
                    <p className="text-sm xl:text-base xl:text-center text-justify text-[#454545]">
                      {item?.des}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          ref={prevRef}
          className={`swiper-prev-button absolute top-[35%] active:-translate-x-1 transition-all -left-4 bg-white p-3 cursor-pointer shadow-lg rounded-full z-10 ${
            beginAndEnd?.isBegin && "opacity-0"
          } `}
        >
          <IoIosArrowBack className="text-[#007aff]" />
        </div>
        <div
          ref={nextRef}
          className={` absolute top-[35%] active:translate-x-1 transition-all -right-4 bg-white shadow-xl p-3 cursor-pointer rounded-full z-10 ${
            beginAndEnd?.isEnd && "opacity-0"
          } `}
        >
          <IoIosArrowForward className="text-[#007aff]" />
        </div>
      </div>
    </div>
  );
};

export default TestiMonials;
