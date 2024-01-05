import React from "react";
import TItleSection from "../components/TitleSection";
import contactus from "../assets/images/contactus.jpg";
import NewLetter from "../components/NewLetter";

const ContactUs = () => {
  return (
    <div className="w-full lg:space-y-14 space-y-7">
      <TItleSection image={contactus} title="contact us" />
      <div className="lg:space-y-14 space-y-7 container mx-auto xl:px-0 md:px-10 px-5 w-full">
        <div className="rounded-lg border md:space-y-6 space-y-3 xl:w-1/2 md:w-3/4 w-full mx-auto shadow-lg md:p-5 p-3">
          <p className="font-semibold text-3xl">Get in touch</p>
          <hr />
          <div className="grid w-full lg:grid-cols-2  gap-4">
            <div className="w-full space-y-1">
              <label htmlFor="firstName" className="Label">
                first name*
              </label>
              <input
                type="text"
                className="input_field"
                placeholder="Type here..."
              />
            </div>
            <div className="w-full space-y-1">
              <label htmlFor="lastname" className="Label">
                last name*
              </label>
              <input
                type="text"
                className="input_field"
                placeholder="Type here..."
              />
            </div>
            <div className="w-full space-y-1">
              <label htmlFor="email" className="Label">
                email*
              </label>
              <input
                type="email"
                className="input_field"
                placeholder="Type here..."
              />
            </div>
            <div className="w-full space-y-1">
              <label htmlFor="phone" className="Label">
                phone number*
              </label>
              <input
                type="number"
                className="input_field"
                placeholder="Type here..."
              />
            </div>
            <div className="w-full space-y-1 lg:col-span-2">
              <label htmlFor="commnets" className="Label">
                comments*
              </label>
              <textarea
                className="input_field max-h-[10rem] min-h-[10rem]"
                placeholder="Type here..."
              />
            </div>
          </div>
          <p className="text-textColor text-lg">
            Please check the box below to proceed.
          </p>
          <button className="green_button lg:w-1/4 w-full">Send</button>
        </div>
        <div className="relative w-full lg:h-auto h-80 flex items-center justify-center">
          <img
            src={require("../assets/images/contactus1.png")}
            alt=""
            className="z-0 w-full h-full"
          />
          <div className="absolute text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-auto flex flex-col items-center gap-3">
            <img
              src={require("../assets/images/mail.png")}
              alt=""
              className="z-0 md:w-24 w-20 md:h-24 h-20"
            />
            <p className="md:text-3xl text-xl font-semibold whitespace-nowrap">For any query email us</p>
            <p>
              <a href="mailto:loremipsum@mail.com" className="text-lg">
                loremipsum@mail.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <NewLetter />
    </div>
  );
};

export default ContactUs;
