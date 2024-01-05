import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import LogoColor from "../assets/images/headerColor.svg";
import Logo from "../assets/images/Logo.png";
import { FaSortDown } from "react-icons/fa6";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  // const [opencategories, setOpenCategories] = useState(false);

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
      className={` p-4  bg-white duration-300 transition-all text-black w-full ${
        !showHeader && "hidden"
      }  ${sticky && "z-10 top-0 fixed shadow-2xl"}`}
    >
      {/*---------- mobile header start----------- */}
      <div
        className={`lg:hidden bg-white  text-black absolute top-0 -left-1 z-20 min-h-screen max-h-screen min-w-[80%] ${
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
                // className={`cursor-pointer uppercase text-[16px] ${
                //   sticky ? "navcolor" : "navlink"
                // } `}
                className={`cursor-pointer uppercase text-[16px] navlink`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </li>
            </Link>
            <Link to="/">
              <li
                className={`cursor-pointer uppercase text-[16px] ${
                  sticky ? "navcolor" : "navlink"
                } `}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Categories
              </li>
            </Link>
            <Link to="/about-us">
              <li
                className={`cursor-pointer uppercase text-[16px] ${
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
                className={`cursor-pointer text-[16px] ${
                  sticky ? "navcolor" : "navlink"
                } `}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Contact
              </li>
            </Link>

            {/* {user !== null ? (
              <Link to="/my-account">
                <li
                  className={`cursor-pointer text-[16px] ${
                    sticky ? "navcolor" : "navlink"
                  } `}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {user?.name}
                </li>
              </Link>
            ) : ( */}
            <div className="gap-2 py-4 space-y-5">
              <div>
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
              <div>
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
          className="md:hidden inset-0 z-0 absolute overflow-hidden backdrop-blur-sm bg-lightBlack bg-opacity-50 min-h-screen max-h-screen max-w-[100%]"
        ></div>
      )}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="lg:hidden inset-0 z-0 absolute overflow-hidden backdrop-blur-sm bg-lightBlack bg-opacity-50 min-h-screen max-h-screen max-w-[100%]"
        ></div>
      )}
      {/*----------- mobile header end ------------*/}

      {/* desk navbar */}
      <nav className="flex justify-between container mx-auto items-center">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={LogoColor} alt="" className="w-full h-fit" />

          {/* {sticky ? (
              <img src={LogoColor} alt="" className="md:w-[110px] w-[80px]" />
            ) : (
              <img src={Logo} alt="" className="md:w-[110px] w-[80px]" />
            )} */}
        </Link>
        <div>
          <ul className=" gap-6 items-center hidden lg:flex">
            <Link to="/">
              <li
                className={`cursor-pointer uppercase text-[16px] navcolor`}
                // className={`cursor-pointer uppercase text-[16px] ${
                //   sticky ? "navcolor" : "navlink"
                // } `}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </li>
            </Link>
            {/* {opencategories && (
              <div
                onClick={() => setOpenCategories(true)}
                className=" inset-0 z-0 absolute overflow-hidden  bg-lightBlack bg-opacity-50 min-h-screen max-h-screen w-full"
              ></div>
            )}
            {opencategories && (
              <div
                onClick={() => setOpenCategories(false)}
                className=" inset-0 z-0 absolute overflow-hidden  bg-lightBlack bg-opacity-50 min-h-screen max-h-screen w-full"
              ></div>
            )} */}
          
            <div className="group cursor-pointer flex items-center flex-row justify-center gap-1 relative z-10">
              <p>CATEGORIES</p>
              <p>
                <FaSortDown className="text-lg text-black mb-2" />
              </p>
            </div>
            <Link to="/best-offers">
              <li
                className={`cursor-pointer uppercase text-[16px] navcolor`}
                // className={`cursor-pointer uppercase text-[16px] ${
                //   sticky ? "navcolor" : "navlink"
                // } `}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Offers
              </li>
            </Link>
            <Link to="/about-us">
              <li
                className={`cursor-pointer uppercase text-[16px] ${
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
                className={`cursor-pointer uppercase text-[16px] ${
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
        </div>{" "}
        <div className="hidden lg:flex gap-2 ">
          <Link to="/sign-up">
            <button
              type="button"
              className={`focus:outline-none uppercase  rounded-3xl px-7 py-1.5 ${
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
              className={`focus:outline-none uppercase px-8 py-1.5 bg-greenColor text-white rounded-3xl hover:bg-greenColor/60 transition-all`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Sign in
            </button>
          </Link>
        </div>
        <RiMenu3Line
          onClick={() => setOpenSidebar(true)}
          className={`lg:hidden text-3xl cursor-pointer text-primary_color`}
        />
      </nav>
    </div>
  );
};

export default Header;
