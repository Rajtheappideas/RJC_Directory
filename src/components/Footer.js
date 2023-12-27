import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import FooterLogo from "../assets/images/FooterLogo.svg";

const Footer = () => {
  // const { pathname } = useLocation();
  // function checkPageUrl() {
  //   if (
  //     pathname.includes("sign-in") ||
  //     pathname.includes("sign-up") ||
  //     pathname.includes("forgot-password") ||
  //     pathname.includes("reset-password") ||
  //     pathname.includes("success") ||
  //     pathname.includes("how-we-work") ||
  //     pathname.includes("who-we-are") ||
  //     pathname.includes("contact") ||
  //     pathname.includes("faq") ||
  //     pathname.includes("terms-and-conditions") ||
  //     pathname.includes("current-vacancies") ||
  //     pathname.includes("job-detail") ||
  //     pathname.includes("my-account") ||
  //     pathname.includes("services")
  //   )
  //     return true;
  // }
  return (
    <div
      // className={`bg-[#004D7F] lg:py-8 py-5 lg:px-20 px-4 space-y-4 relative w-full text-black  ${
      //   !checkPageUrl() && "mt-20"
      // }`}
      className="lg:py-8 py-5 lg:px-20 px-4 space-y-4 relative w-full text-black"
    >
      {/* <div className="container"> */}
      <div className="grid md:grid-cols-2 lg:gap-0 gap-10  lg:grid-cols-5 lg:px-10">
        <Link to="/">
          <img src={FooterLogo} alt="" className="lg:w-2/5 w-32" />
        </Link>
        <div className="space-y-4 text-white">
          <p className="text-primary_color text-base font-normal footer heading">
            Resources
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Home</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D]">
            <Link
              to="/contact-us"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Contact</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D]">
            <Link
              to="/about-us"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">About Us</span>
            </Link>
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-primary_color text-base font-normal footer heading">
            Legal
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/privacy-policy"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Privacy policy</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D]">
            <Link
              to="/terms-and-conditions"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Terms Condition</span>
            </Link>
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-primary_color text-base font-normal footer heading">
            TOP CITIES
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/contact"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Austin</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/contact"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Atlanta</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/contact"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Boston</span>
            </Link>
          </p>
          <p className="text-sm cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/contact"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">New york</span>
            </Link>
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-primary_color text-base font-normal footer heading">
            Social Media
          </p>
          <div className="flex items-center gap-6">
            <div className=" text-[#403D3D] hover:text-primary_color text-2xl  cursor-pointer ">
              <FaPinterest />
            </div>
            <div className=" text-[#403D3D] hover:text-primary_color text-2xl  cursor-pointer ">
              <FaTwitter />
            </div>
            <div className=" text-[#403D3D] hover:text-primary_color text-2xl  cursor-pointer ">
              <FaFacebook />
            </div>
            <div className=" text-[#403D3D] hover:text-primary_color text-2xl  cursor-pointer ">
              <FaYoutube />
            </div>
            <div className=" text-[#403D3D] hover:text-primary_color text-2xl  cursor-pointer ">
              <FaInstagram />
            </div>
            <div className=" text-[#403D3D] hover:text-primary_color text-2xl  cursor-pointer ">
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="pt-11">
        <hr className=" w-full h-[1px]" />
      </div>
      <div className="text-center p-3">
        <p className="text-[#403D3D] text-sm">
          Copyright @FOOTBALL Recruitment 2023 All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
