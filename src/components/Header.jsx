import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoColor from "../assets/images/headerColor.svg";
import {
  FaArrowUpLong,
  FaChevronDown,
  FaChevronRight,
  FaLocationDot,
  FaLocationPin,
  FaSortDown,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeCity,
  handleChangeState,
  handleClearMerchantName,
  handleGetAutocompleteName,
} from "../redux/GlobalStates";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { handleLogout } from "../redux/AuthSlice";
import { handleChangeSearchParams } from "../redux/MerchantSlice";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [activeSubcategories, setActiveSubcategories] = useState([]);
  const [query, setQuery] = useState("");
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);

  const { user } = useSelector((s) => s.root.auth);
  const { searchParams } = useSelector((s) => s.root.merchant);
  const {
    categories,
    categoryLoading,
    subCategoryloading,
    subCategories,
    countryList,
    cityList,
    stateList,
    countryAndCityLoading,
    selectedCity,
    selectedState,
    merchantName,
  } = useSelector((s) => s.root.global);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function hanldeLogoutFn() {
    if (!window.confirm("are you sure")) return;
    toast.loading("logout...");
    setTimeout(() => {
      dispatch(handleLogout());
      navigate("/sign-in");
      toast.remove();
    }, 1000);
  }

  function handleSearchMerchantName() {
    setShowSearchSuggestion(false);
    if (query === "") {
      dispatch(handleChangeSearchParams({ name: "" }));
    }
    if (!query) return dispatch(handleClearMerchantName([]));
    toast.remove();
    if (merchantName.length > 0 && merchantName.includes(query)) {
      dispatch(handleClearMerchantName([]));
      return;
    }
    toast.loading("Finding...");
    const response = dispatch(handleGetAutocompleteName({ query }));
    if (response) {
      response
        .then((res) => {
          if (res?.payload?.success) {
            setShowSearchSuggestion(true);
          }
          toast.remove();
        })
        .catch((err) => {
          toast.remove();
          setShowSearchSuggestion(false);
          console.log("auto complete merchant name", err);
        });
    }
  }

  function handleFindMerchant() {
    toast.remove();
    if (selectedState === "" || query === "")
      return toast.error("Please fill the fields");
    dispatch(handleChangeSearchParams({ name: query, state: selectedState }));
    navigate("/search");
  }

  useEffect(() => {
    let timer = setTimeout(handleSearchMerchantName, 300);
    return () => clearTimeout(timer);
  }, [query]);

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

  useEffect(() => {
    if (subCategories.length > 0)
      setActiveSubcategories(subCategories[0]?.subcategories);
  }, [subCategoryloading]);

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
          <ul className="leading-10 pt-3" onClick={() => setOpenSidebar(false)}>
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
            <Link
              to="/search"
              className={`cursor-pointer  text-[16px]  `}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              All Merchants
            </Link>
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
            {user && (
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => hanldeLogoutFn()}
              >
                Logout{" "}
              </span>
            )}
            <div className="gap-2 py-4 flex items-center flex-col">
              {user !== null ? (
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
              ) : (
                <>
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
                </>
              )}
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

      {/* -----------desk navbar start---------- */}
      <nav className="flex justify-between container mx-auto items-center text-sm">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={LogoColor}
            alt=""
            className="lg:w-full md:w-28 w-24 h-fit"
          />
        </Link>
        {/* search box */}
        <div className="xl:w-1/3 lg:w-1/2 w-2/3 hidden border p-3 rounded-full md:flex items-center gap-2 bg-gray-100">
          <div className="w-1/2 relative group flex items-center justify-between cursor-pointer">
            <div className="flex items-center justify-between gap-2 w-full">
              <FaLocationDot className="h-6 w-6" />
              <span className="font-medium capitalize">
                {selectedState === "" && searchParams?.state === ""
                  ? "Select State"
                  : selectedState || searchParams?.state}
              </span>
              <p className="ml-auto flex gap-1 items-center">
                {(selectedState !== "" || searchParams?.state !== "") && (
                  <AiOutlineClose
                    className="h-5 w-5 group-hover:block hidden"
                    onClick={() => {
                      dispatch(handleChangeState(""));
                      dispatch(handleChangeSearchParams({ state: "" }));
                    }}
                  />
                )}
                <FaSortDown
                  className={`text-black ml-auto min-h-4 min-w-[1rem] mb-2 group-hover:mb-0 duration-300 group-hover:rotate-180 transition-all `}
                />
              </p>
              <div className="absolute z-10 group-hover:scale-100 scale-0 transition-all origin-top bg-white min-w-[13rem] text-left ease-in-out duration-300 top-11 left-0 p-3 max-h-72 overflow-y-auto custom_scrollbar rounded-2xl shadow-2xl text-textColor space-y-2">
                {countryAndCityLoading ? (
                  <span className="loading ">Loading...</span>
                ) : (
                  stateList.length > 0 && (
                    <>
                      {/* <p
                        className="w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all"
                        onClick={() => dispatch(handleChangeCity("All"))}
                      >
                        All
                      </p> */}
                      {[...new Set(stateList.flat(Infinity))]
                        .sort((a, b) => a.localeCompare(b))
                        .map((state) => (
                          <p
                            key={state}
                            className={`w-full p-1 hover:bg-gray-100 hover:font-semibold transition-all ${
                              (searchParams?.state === state ||
                                selectedState === state) &&
                              "bg-gray-200 font-semibold"
                            } `}
                            onClick={() => dispatch(handleChangeState(state))}
                          >
                            {state}
                          </p>
                        ))}
                    </>
                  )
                )}
              </div>
            </div>
          </div>
          |
          <div className="w-1/2 flex items-center justify-between relative">
            <input
              type="text"
              placeholder="Search"
              autoComplete="off"
              className="outline-none text-black flex-1 bg-gray-100"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            {merchantName.length > 0 && showSearchSuggestion && (
              <>
                <span className="absolute z-30 top-10 clip-div border shadow-lg left-10 rotate-[135deg] bg-white h-6 w-6"></span>
                <div className="absolute z-20 transition-all border origin-top bg-white min-w-[20vw] text-left ease-in-out duration-300 top-12 left-0 p-3 max-h-72 overflow-y-auto custom_scrollbar rounded-2xl shadow-2xl text-textColor space-y-2">
                  {merchantName.map((name) => (
                    <p
                      key={name}
                      className="w-full cursor-pointer p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all"
                      onClick={() => {
                        setQuery(name);
                        setTimeout(() => {
                          dispatch(handleClearMerchantName([]));
                          dispatch(handleChangeSearchParams({ name }));
                        }, 0);
                      }}
                    >
                      <IoSearch className="min-h-4 min-w-[1rem] text-opacity-50 text-gray-400 mr-2" />{" "}
                      {name}
                      <FaArrowUpLong className="min-h-4 min-w-[1rem] ml-auto text-gray-300 -rotate-45" />
                    </p>
                  ))}
                </div>
              </>
            )}
            <AiOutlineSearch
              onClick={() => handleFindMerchant()}
              className="min-h-6 min-w-[1.5rem] xl:flex-1 cursor-pointer ml-auto"
            />
          </div>
        </div>
        {/* list */}
        <ul className="gap-6 items-center hidden xl:flex">
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
          <div
            className={`group  cursor-pointer flex items-center flex-row justify-center gap-1 relative z-10`}
          >
            <p>CATEGORIES</p>
            <FaSortDown
              className={`text-black ml-auto min-h-4 min-w-[1rem] mb-2 group-hover:mb-0 duration-300 group-hover:rotate-180 transition-all `}
            />
            {/* dropdown */}
            <div className="absolute overflow-y-auto flex items-start gap-0 z-10 py-2 min-w-[40rem] group-hover:scale-100 scale-0 custom_scrollbar transition-all origin-top  bg-white text-left ease-in-out duration-300 top-9 -left-40 rounded-lg shadow-2xl text-textColor space-y-2">
              {/* left side */}
              <ul className="font-semibold max-h-full text-textColor capitalize tracking-wide border-r w-1/2 overflow-y-auto ">
                <li className=" w-full flex items-center justify-between text-lg">
                  <span className="px-7 py-2 whitespace-nowrap">
                    All Categories
                  </span>
                </li>
                {subCategories.length > 0 &&
                  subCategories.map((category, index) => (
                    <li
                      key={category?._id}
                      className={`${
                        searchParams?.category === category?._id &&
                        "bg-gray-200"
                      } hover:bg-gray-100 tracking-wide w-full flex items-center justify-between`}
                      onMouseOver={() => {
                        setActiveSubcategories(category?.subcategories);
                      }}
                      onClick={() => {
                        dispatch(handleChangeSearchParams({ category: "" }));
                        dispatch(
                          handleChangeSearchParams({ category: category?._id })
                        );
                        navigate("/search");
                      }}
                    >
                      <span className="px-7 py-2 whitespace-nowrap">
                        {category?.name}
                      </span>
                      <FaChevronRight className="min-h-4 min-w-4 text-gray-400 font-light pr-2" />
                    </li>
                  ))}
              </ul>
              {/* right side */}
              <div className="space-y-2 w-1/2">
                <span className="p-3 whitespace-nowrap font-semibold text-lg text-left">
                  Subcategories
                </span>
                <hr />
                <ul className="px-3">
                  {activeSubcategories.map((item, i) => (
                    <li
                      key={item?._id}
                      className={` ${
                        searchParams?.subcategory === item?._id && "bg-gray-100"
                      } p-2 whitespace-nowrap text-gray-400 font-medium capitalize hover:bg-gray-50`}
                      onClick={() => {
                        dispatch(handleChangeSearchParams({ subcategory: "" }));
                        dispatch(
                          handleChangeSearchParams({ subcategory: item?._id })
                        );
                        navigate("/search");
                      }}
                    >
                      {item?.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
          {user !== null ? (
            <div className="relative group">
              <Link to="/my-account">
                <button
                  type="button"
                  className={`focus:outline-none uppercase px-8 py-1.5 bg-greenColor text-white rounded-3xl hover:bg-greenColor/60 transition-all`}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  My Account
                </button>
              </Link>
              <span
                onClick={() => hanldeLogoutFn()}
                className="group-hover:scale-100 flex items-center justify-center cursor-pointer rounded-lg p-1 gap-2 scale-0 font-semibold transition-all duration-300 ease-in-out w-full text-center absolute top-10 z-40 left-0 bg-red-200 hover:bg-red-300"
              >
                <MdLogout className="w-6 h-6 text-red-600" /> Logout
              </span>
            </div>
          ) : (
            <>
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
          )}
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
