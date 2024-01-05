import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

// import Swiper core and required modules

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
  return (
    <div className="container mx-auto xl:px-2 px-5 space-y-5">
      <div className="space-y-1 text-center">
        <div className=" mx-auto">
          <p className="xl:text-[30px] text-2xl text-center  font-semibold line heading2 uppercase">
            User’s <span className="text-[#023F86]">Testimonials</span>
          </p>
        </div>
      </div>
      <div className="px-3">
        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          className="relative"
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-next-button",
            prevEl: ".swiper-prev-button",
          }}
          // pagination={{ clickable: true }}
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
              <div className="border bottom-2 lg:p-14 p-3 rounded-md shadow-md">
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

          <div className="swiper-prev-button absolute top-[50%] bg-white p-2 cursor-pointer shadow-lg rounded-full z-10">
            <IoIosArrowBack className="text-[#007aff]" />
          </div>
          <div className="swiper-next-button absolute top-[50%] right-0 bg-white shadow-lg p-2 cursor-pointer rounded-full z-20">
            <IoIosArrowForward className="text-[#007aff]" />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default TestiMonials;
