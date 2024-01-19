import React, { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import FooterLogo from "../assets/images/FooterLogo.svg";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes("sign-in") ||
      location.pathname.includes("sign-up") ||
      location.pathname.includes("forgot-password")
    ) {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [location]);

  return (
    <footer
      className={` ${
        !showFooter && "hidden"
      } lg:py-8 py-5 lg:px-20 space-y-4 relative w-full text-black container mx-auto xl:px-0 px-5`}
    >
      {/* <div className="container"> */}
      <div className="grid md:grid-cols-2 lg:gap-0 gap-4 lg:grid-cols-5 lg:px-10 text-lg">
        <Link to="/">
          <img src={FooterLogo} alt="" className="lg:w-2/5 w-20" />
        </Link>
        <div className="md:space-y-4 space-y-1 text-white">
          <p className="text-primary_color text-base font-normal footer heading">
            Resources
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Home</span>
            </Link>
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D]">
            <Link
              to="/contact-us"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Contact</span>
            </Link>
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D]">
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
        <div className="md:space-y-4 space-y-1">
          <p className="text-primary_color text-base font-normal footer heading">
            Legal
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/privacy-policy"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Privacy policy</span>
            </Link>
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D]">
            <Link
              to="/terms"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Terms Condition</span>
            </Link>
          </p>
        </div>
        <div className="md:space-y-4 space-y-1">
          <p className="text-primary_color text-base font-normal footer heading">
            TOP CITIES
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/#"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Austin</span>
            </Link>
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/#"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Atlanta</span>
            </Link>
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/#"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">Boston</span>
            </Link>
          </p>
          <p className=" cursor-pointer font-light text-[#403D3D] ">
            <Link
              to="/#"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="navlink inline-block">New york</span>
            </Link>
          </p>
        </div>
        <div className="md:space-y-4 space-y-1">
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
      <div className="md:pt-11 pt-1">
        <hr className=" w-full h-[1px]" />
      </div>
      <div className="text-center md:p-3 p-1">
        <p className="text-[#403D3D]">
          Copyright @RJC Directory {new Date().getFullYear()} All Right Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
