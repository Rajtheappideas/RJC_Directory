import React, { useEffect, useState } from "react";
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import { FaArrowUpLong, FaSortDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeCity,
  handleChangeState,
  handleClearMerchantName,
  handleGetAutocompleteName,
} from "../../redux/GlobalStates";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { handleChangeSearchParams } from "../../redux/MerchantSlice";
import { AiOutlineClose } from "react-icons/ai";

const FindProduct = () => {
  const [query, setQuery] = useState("");
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);

  const {
    merchantName,
    autoCompleteLoading,
    countryList,
    cityList,
    stateList,
    countryAndCityLoading,
    selectedCity,
    selectedState,
  } = useSelector((s) => s.root.global);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSearchMerchantName() {
    setShowSearchSuggestion(false);
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
    return () => {
      dispatch(handleClearMerchantName([]));
    };
  }, []);

  return (
    <div className="bg-white flex items-center relative  flex-col gap-y-4 lg:px-20 lg:py-10 p-4 xl:w-[70%] w-11/12 rounded-2xl">
      <span className="lg:text-4xl md:text-3xl text-2xl">
        Welcome to the <b className="text-[#023F86] font-extrabold">RJC</b>{" "}
        <b className="text-[#009F4B] font-extrabold">Directory</b>{" "}
      </span>
      <p className="lg:w-11/12 lg:text-center text-justify text-base text-textColor text-opacity-50">
        Discover local businesses effortlessly with our comprehensive directory.
        Find services, contact details, and reviews for any business,
        simplifying your decision-making process.
      </p>

      <div className="flex md:flex-row flex-col w-full items-center justify-between gap-4 md:px-1.5 md:py-1.5 p-3 border border-opacity-50 border-borderColor md:rounded-[2rem] rounded-2xl bg-gray-50">
        {/* input  */}
        <div className="lg:w-[65%] md:w-7/12 w-full relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-5 placeholder:text-opacity-60 outline-none p-1 bg-transparent"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          {merchantName.length > 0 && showSearchSuggestion && (
            <>
              <span className="absolute z-20  top-14 clip-div border shadow-lg left-10 rotate-[135deg] bg-white h-6 w-6"></span>
              <div className="absolute z-20 transition-all border origin-top bg-white w-full text-left ease-in-out duration-300 top-16 left-0 p-3 max-h-72 overflow-y-auto custom_scrollbar rounded-2xl shadow-2xl text-textColor space-y-2">
                {merchantName.map((name) => (
                  <p
                    key={name}
                    className="w-full cursor-pointer p-1 hover:bg-gray-100 flex items-center hover:font-semibold transition-all"
                    onClick={() => {
                      setQuery(name);
                      setTimeout(() => {
                        dispatch(handleClearMerchantName([]));
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
        </div>
        <span className="bg-opacity-40 bg-gray-400 md:h-6 md:w-[1px] w-full h-[1px] "></span>
        {/* state list */}
        <div
          className={`flex group justify-center relative items-center cursor-pointer gap-3 lg:w-[20%] md:w-3/12 w-full`}
        >
          <IoLocationOutline className="min-h-6 min-w-[1.5rem]" />
          <span className="font-semibold">
            {selectedState === "" ? "Select state" : selectedState}
          </span>
          <p className="ml-auto flex gap-1 items-center">
            {selectedState !== "" && (
              <AiOutlineClose
                className="h-5 w-5 group-hover:block hidden"
                onClick={() => {
                  dispatch(handleChangeState(""));
                }}
              />
            )}
            <FaSortDown
              className={`text-black ml-auto min-h-4 min-w-[1rem] mb-2 group-hover:mb-0 duration-300 group-hover:rotate-180 transition-all `}
            />
          </p>

          <div
            className={`absolute group-hover:scale-100 scale-0 transition-all origin-top bg-white min-w-[13rem] w-full text-left ease-in-out duration-300 top-9 left-0 p-3 max-h-72 overflow-y-auto custom_scrollbar rounded-2xl shadow-2xl text-textColor space-y-2 `}
          >
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
                          selectedState === state && "bg-gray-200 font-semibold"
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
        <button
          onClick={() => handleFindMerchant()}
          className="lg:w-[15%]  md:w-[20%] w-full h-12 uppercase active:scale-90 transition-all font-semibold text-white bg-greenColor rounded-3xl"
        >
          <IoSearch className="h-6 w-6 inline-block mr-1 mb-0.5" />
          Find
        </button>
      </div>
    </div>
  );
};

export default FindProduct;
