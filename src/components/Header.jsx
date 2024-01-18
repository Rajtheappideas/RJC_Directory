import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import LogoColor from "../assets/images/headerColor.svg";
import Logo from "../assets/images/Logo.png";
import {
  FaChevronDown,
  FaLocationDot,
  FaLocationPin,
  FaSortDown,
} from "react-icons/fa6";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });

    if (
      location.pathname.includes("sign-in") ||
      location.pathname.includes("sign-up") ||
      location.pathname.includes("forgot-password")
    ) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, [location]);

  return (
    <div
      className={`md:p-4 p-2 bg-white duration-300 transition-all text-black w-full ${
        !showHeader && "hidden"
      }  ${sticky && "z-20 top-0 fixed shadow-2xl"}`}
    >
      {/*---------- mobile header start----------- */}
      <div
        className={`xl:hidden bg-white  text-black absolute top-0 -left-1 z-20 min-h-screen max-h-screen min-w-[80%] ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        } transition duration-300 ease-linear`}
      >
        <AiOutlineClose
          className="ml-auto m-5 cursor-pointer text-2xl"
          onClick={() => setOpenSidebar(false)}
        />
        <div className="items-center text-center ">
          <ul className="leading-10 pt-3 ">
            <Link to="/">
              <li
                className={`cursor-pointer  text-[16px] `}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </li>
            </Link>
            <li
              className={`cursor-pointer  text-[16px]  `}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Categories
            </li>
            <Link to="/about-us">
              <li
                className={`cursor-pointer  text-[16px]`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                About Us
              </li>
            </Link>
            <Link to="/best-offers">
              <li
                className={`cursor-pointer  text-[16px] `}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Offers
              </li>
            </Link>
            <Link to="/contact-us">
              <li
                className={`cursor-pointer  text-[16px]  `}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Contact
              </li>
            </Link>

            <div className="gap-2 py-4 flex items-center flex-col">
              <div className="inline-block">
                <Link to="/my-account">
                  <button
                    type="button"
                    className="focus:outline-none text-[14px] mx-auto block bg-primary_color text-white  rounded-lg text-sm px-4 py-1.5 hover:bg-white border border-primary_color hover:text-primary_color "
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    My Account
                  </button>
                </Link>
              </div>
              <div className="inline-block">
                <Link to="/sign-up">
                  <button
                    type="button"
                    className="focus:outline-none text-[14px] mx-auto block bg-primary_color text-white  rounded-lg text-sm px-4 py-1.5 hover:bg-white border border-primary_color hover:text-primary_color "
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
              <div className="inline-block">
                <Link to="/sign-in">
                  <button
                    type="button"
                    className="focus:outline-none text-[14px] block mx-auto bg-primary_color text-white  rounded-lg text-sm px-4 py-1.5 hover:bg-white border border-primary_color hover:text-primary_color"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </div>
            {/* )} */}
          </ul>
        </div>
      </div>
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="xl:hidden inset-0 z-10 fixed overflow-hidden backdrop-blur-sm bg-lightBlack bg-opacity-50 min-h-screen max-h-screen max-w-[100%]"
        ></div>
      )}
      {/*----------- mobile header end ------------*/}
      {/* desk navbar */}
      <nav className="flex justify-between container mx-auto items-center text-sm">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={LogoColor} alt="" className="lg:w-full md:w-28 w-24 h-fit" />
        </Link>
        {/* search box */}
        <div className="xl:w-1/3 lg:w-1/2 w-2/3 hidden border p-3 rounded-full md:flex items-center gap-2 bg-gray-100">
          <div className="w-1/2 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2 w-full">
              <FaLocationDot className="h-6 w-6" />
              <select name="locations" id="" className="outline-none text-textColor cursor-pointer text-opacity-70 font-semibold bg-transparent w-full">
                <option value="new york">New york</option>
                <option value="new york">New york</option>
                <option value="new york">New york</option>
                <option value="new york">New york</option>
                <option value="new york">New york</option>
              </select>
            </div>
          </div>
          |
          <div className="w-1/2 flex items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-black flex-1 bg-gray-100"
            />
            <AiOutlineSearch className="min-h-6 min-w-[1.5rem] xl:flex-1 cursor-pointer ml-auto" />
          </div>
        </div>
        {/* list */}
        <ul className=" gap-6 items-center hidden xl:flex">
          <Link to="/">
            <li
              className={`cursor-pointer uppercase text-[16px] navcolor`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </li>
          </Link>
          <div className="group cursor-pointer flex items-center flex-row justify-center gap-1 relative z-10">
            <p>CATEGORIES</p>
            <p>
              <FaSortDown className="text-lg text-black mb-2" />
            </p>
          </div>
          <Link to="/best-offers">
            <li
              className={`cursor-pointer uppercase navcolor`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Offers
            </li>
          </Link>
          <Link to="/about-us">
            <li
              className={`cursor-pointer uppercase ${
                sticky ? "navcolor" : "navlink"
              } `}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              About Us
            </li>
          </Link>
          <Link to="/contact-us">
            <li
              className={`cursor-pointer uppercase ${
                sticky ? "navcolor" : "navlink"
              } `}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Contact
            </li>
          </Link>
        </ul>
        <span className="bg-opacity-40 bg-gray-400 xl:h-4 w-[1px]"></span>

        <div className="hidden xl:flex gap-2">
          <>
            {/* <Link to="/my-account">
              <button
                type="button"
                className={`focus:outline-none uppercase px-8 py-1.5 bg-greenColor text-white rounded-3xl hover:bg-greenColor/60 transition-all`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                My Account
              </button>
            </Link> */}
            <Link to="/sign-up">
              <button
                type="button"
                className={`focus:outline-none uppercase rounded-3xl px-2 py-1.5 ${
                  sticky
                    ? "hover:bg-primary_color hover:text-white"
                    : "hover:bg-white hover:text-black"
                } `}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Sign Up
              </button>
            </Link>
            <Link to="/sign-in">
              <button
                type="button"
                className={`focus:outline-none uppercase px-4 py-1.5 bg-greenColor text-white rounded-3xl hover:bg-greenColor/60 transition-all`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Sign in
              </button>
            </Link>
          </>
        </div>
        <RiMenu3Line
          onClick={() => setOpenSidebar(true)}
          className={`xl:hidden text-3xl cursor-pointer text-primary_color`}
        />
      </nav>
    </div>
  );
};

export default Header;
