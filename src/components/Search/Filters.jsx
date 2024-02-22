import React, { memo, useCallback, useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineClose,
  AiOutlineDown,
  AiOutlineStar,
} from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeSearchParams } from "../../redux/MerchantSlice";
import {
  handleCatgegoryAndSubcategoryFromHeader,
  handleChangeState,
} from "../../redux/GlobalStates";

const Filters = memo(() => {
  const [activeSubcategories, setActiveSubcategories] = useState(null);
  const [showDropDowns, setShowDropDowns] = useState({
    category: true,
    subCategory: true,
    location: true,
    rating: true,
  });
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [showIcon, setShowIcon] = useState(false);

  const { searchParams } = useSelector((s) => s.root.merchant);
  const { user } = useSelector((s) => s.root.auth);

  const {
    categories,
    categoryAndSubcategoryfromHeader,
    subCategories,
    countryList,
    selectedState,
  } = useSelector((s) => s.root.global);

  const dispatch = useDispatch();

  function handleUpdateAppliedFilters(filter, from) {
    const findAlreadyfilters = appliedFilters.filter(
      (fil) => fil?.name == filter?.name && filter?.filterType !== "rating"
    );
    if (findAlreadyfilters.length > 0) return;

    if (filter.filterType === "country") {
      return setAppliedFilters((prev) => [
        ...prev.filter(
          (fil) =>
            fil?.filterType !== "state" &&
            fil?.filterType !== "city" &&
            fil.filterType !== "country"
        ),
        filter,
      ]);
    }

    if (filter.filterType === "state") {
      return setAppliedFilters((prev) => [
        ...prev.filter(
          (fil) => fil?.filterType !== "state" && fil?.filterType !== "city"
        ),
        filter,
      ]);
    }

    if (
      filter.filterType === "category" &&
      appliedFilters.find((fil) => fil.filterType == "subcategory") &&
      from !== "default"
    ) {
      const removeArr = appliedFilters.filter(
        (fil) =>
          fil.filterType !== "subcategory" && fil.filterType !== "category"
      );
      setAppliedFilters([...removeArr, filter]);
      dispatch(handleChangeSearchParams({ subcategory: "" }));
      return;
    }

    const findFilter = appliedFilters.filter(
      (fil) => fil.filterType === filter.filterType
    );
    if (findFilter.length === 0) {
      return setAppliedFilters([...appliedFilters, filter]);
    } else {
      const newFilterArr = appliedFilters.map((fil) => {
        if (fil?.filterType === filter.filterType) {
          return filter;
        } else {
          return fil;
        }
      });
      setAppliedFilters(newFilterArr);
      return;
    }
  }

  function handleRemoveFilter(filter) {
    if (filter.filterType === "category") {
      dispatch(handleChangeSearchParams({ category: "", subcategory: "" }));
      const removeCategoryAndSubCategory = appliedFilters.filter(
        (fil) =>
          fil.filterType !== "subcategory" && fil.filterType !== "category"
      );
      setAppliedFilters(removeCategoryAndSubCategory);
      setActiveSubcategories(null);
      return;
    } else if (filter.filterType === "subcategory") {
      dispatch(handleChangeSearchParams({ subcategory: "" }));
      const removeSubCategory = appliedFilters.filter(
        (fil) => fil.filterType !== "subcategory"
      );
      return setAppliedFilters(removeSubCategory);
    } else if (filter?.filterType === "rating") {
      setAppliedFilters(
        appliedFilters.filter((fil) => fil.name !== filter.name)
      );
      dispatch(
        handleChangeSearchParams({
          rating: 0,
        })
      );
      return;
    } else {
      const remainingFilters = appliedFilters.filter(
        (fil) => fil.name !== filter.name
      );
      setAppliedFilters(remainingFilters);
      if (filter?.filterType === "country") {
        return dispatch(handleChangeSearchParams({ country: "" }));
      } else if (filter?.filterType === "state") {
        return dispatch(handleChangeSearchParams({ state: "" }));
      } else if (filter?.filterType === "city") {
        return dispatch(handleChangeSearchParams({ city: "" }));
      }
    }
  }

  function clearAllFilters() {
    setAppliedFilters([]);
    setActiveSubcategories(null);
    dispatch(
      handleChangeSearchParams({
        name: "",
        page: "1",
        limit: "10",
        city: "",
        country: "",
        state: "",
        category: "",
        subcategory: "",
        MyPreferences: "off",
        sortBy: "ratingHighToLow",
        rating: 0,
      })
    );
  }

  function handleOnclickCategory(category) {
    dispatch(
      handleChangeSearchParams({
        category: category?._id,
      })
    );
    handleUpdateAppliedFilters({
      name: category?.name,
      filterType: "category",
    });
    setActiveSubcategories(
      subCategories.find((sub) => sub?.name === category?.name)
    );
    dispatch(handleCatgegoryAndSubcategoryFromHeader(false));
  }

  function handleSetDefaultValues() {
    if (categoryAndSubcategoryfromHeader) {
      const findCategory = subCategories.find(
        (s) => s._id === searchParams?.category
      );

      if (searchParams?.category && searchParams?.subcategory === "") {
        setActiveSubcategories(
          subCategories.find((sub) => sub?._id === searchParams?.category)
        );
        return setAppliedFilters([
          ...appliedFilters.filter(
            (fil) =>
              fil?.filterType !== "category" && fil.filterType !== "subcategory"
          ),
          { name: findCategory?.name, filterType: "category" },
        ]);
      }
      if (searchParams?.subcategory && searchParams?.category) {
        const findSubcategory = subCategories
          .find((s) => s._id === findCategory?._id)
          ?.subcategories.find((sub) => sub?._id === searchParams?.subcategory);
        if (findSubcategory) {
          return setAppliedFilters([
            ...appliedFilters.filter(
              (fil) => fil?.filterType !== "subcategory"
            ),
            { name: findSubcategory?.name, filterType: "subcategory" },
          ]);
        } else {
          const findCategoryBySubcategory = subCategories.find((sub) =>
            sub?.subcategories.find((s) => s?._id === searchParams?.subcategory)
          );
          const findSubCategoryOvercategory = subCategories
            .find((s) => s._id === findCategoryBySubcategory?._id)
            ?.subcategories.find(
              (sub) => sub?._id === searchParams?.subcategory
            );
          const removeCategoryAndSubCategory = appliedFilters.filter(
            (fil) =>
              fil.filterType !== "category" && fil.filterType !== "subcategory"
          );
          let finalArr = [
            ...removeCategoryAndSubCategory,
            { name: findCategoryBySubcategory?.name, filterType: "category" },
            {
              name: findSubCategoryOvercategory?.name,
              filterType: "subcategory",
            },
          ];
          dispatch(
            handleChangeSearchParams({
              category: findCategoryBySubcategory?._id,
            })
          );
          setActiveSubcategories(
            subCategories.find(
              (sub) => sub?._id === findCategoryBySubcategory?._id
            )
          );
          return setAppliedFilters(finalArr);
        }
      }
    }
    if (selectedState !== "") {
      const findCountry = countryList.find((country) =>
        country.states.find((s) => s.state === selectedState)
      );
      const findState = findCountry?.states.find(
        (s) => s.state === selectedState
      );
      if (findCountry) {
        handleUpdateAppliedFilters({
          name: findCountry?.country,
          filterType: "country",
        });
      }
      if (findState) {
        handleUpdateAppliedFilters({
          name: findState?.state,
          filterType: "state",
        });
      }
      dispatch(
        handleChangeSearchParams({
          country: findCountry?.country,
          state: findState?.state,
        })
      );
      dispatch(handleChangeState(""));
    }
  }

  useEffect(() => {
    handleSetDefaultValues();
  }, [
    selectedState,
    searchParams?.name,
    categoryAndSubcategoryfromHeader,
    searchParams?.category,
    searchParams?.subcategory,
  ]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.document.body.clientWidth > 1279) {
        setShowIcon(false);
        setShowFilters(true);
      } else {
        setShowIcon(true);
        setShowFilters(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [window.document.body.clientWidth]);

  return (
    <div className="xl:w-3/12 w-full  border border-gray-200 rounded-lg md:p-3 p-2 md:space-y-3 space-y-2">
      {/* titles */}
      <div className="flex items-center justify-between w-full">
        <p
          onClick={() => showIcon && setShowFilters(!showFilters)}
          className="font-semibold md:text-2xl text-blue-800 cursor-pointer"
        >
          Filters{" "}
          {showIcon && (
            <AiOutlineDown
              className={`inline-block ml-1 transition-all duration-300 ease-in-out ${
                showFilters ? "rotate-180" : "rotate-0"
              } `}
            />
          )}
        </p>
        {appliedFilters.length > 0 && (
          <p
            onClick={() => {
              clearAllFilters();
            }}
            className="font-medium cursor-pointer hover:bg-blueColor/10 transition-all p-1 md:text-xl uppercase text-blueColor"
          >
            Clear all
          </p>
        )}
      </div>
      {/* choosen filtes */}
      <div className="w-full h-full flex flex-wrap gap-2 items-center">
        {appliedFilters.length > 0 &&
          appliedFilters.map((filter, i) => (
            <p
              key={i}
              className="w-auto p-2 flex items-center gap-2 cursor-pointer bg-gray-200 text-textColor opacity-80"
            >
              {filter?.name !== 0 && filter?.name}
              {filter?.filterType === "rating" && filter?.name === 0 ? (
                <>
                  All
                  <AiOutlineStar className="text-gray-600" />
                </>
              ) : (
                filter?.filterType === "rating" && (
                  <>
                    &nbsp;& above
                    <AiOutlineStar className="text-gray-600" />
                  </>
                )
              )}
              <AiOutlineClose onClick={() => handleRemoveFilter(filter)} />
            </p>
          ))}
      </div>
      {showFilters && (
        <>
          <hr className="w-full" />
          {/* my preferences */}
          <div className="flex w-full justify-between items-center">
            <p className="font-semibold md:text-xl">My preferences</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={(e) => {
                  dispatch(
                    handleChangeSearchParams({
                      MyPreferences: e.target.checked ? "on" : "off",
                    })
                  );
                }}
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={searchParams?.MyPreferences === "on" ? true : false}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
          <hr className="w-full" />
          {/* category */}
          <div className="w-full overflow-hidden flex flex-col gap-2">
            <p
              onClick={() => {
                setShowDropDowns({
                  ...showDropDowns,
                  category: !showDropDowns.category,
                });
              }}
              className=" cursor-pointer flex items-center justify-between w-full md:text-xl font-semibold"
            >
              <span>Category</span>
              <IoIosArrowDown
                className={`text-xl cursor-pointer ${
                  showDropDowns.category ? "rotate-0" : "rotate-180"
                } `}
              />
            </p>
            <div
              className={`overflow-y-auto space-y-1 text-textColor font-medium md:text-lg transition-all ${
                showDropDowns?.category
                  ? "scale-100 h-52 md:p-2 "
                  : "scale-0 h-0 p-0"
              } duration-300 ease-in-out origin-top `}
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <p
                    key={category?._id}
                    className={` ${
                      searchParams?.category === category?._id && "bg-gray-200"
                    } cursor-pointer hover:bg-gray-100 transition-all w-full p-1`}
                    onClick={() => handleOnclickCategory(category)}
                  >
                    {category?.name}
                  </p>
                ))
              ) : (
                <p className="text-sm font-light text-center">
                  No categories here.
                </p>
              )}
            </div>
          </div>
          <hr className="w-full" />
          {/*sub category */}
          <div className="w-full overflow-hidden flex flex-col gap-2">
            <p
              onClick={() => {
                setShowDropDowns({
                  ...showDropDowns,
                  subCategory: !showDropDowns.subCategory,
                });
              }}
              className="cursor-pointer flex items-center justify-between w-full md:text-xl font-semibold"
            >
              <span>Sub Category</span>
              <IoIosArrowDown
                className={`text-xl cursor-pointer ${
                  showDropDowns.subCategory ? "rotate-0" : "rotate-180"
                } `}
              />{" "}
            </p>

            <div
              className={`overflow-y-auto space-y-1 text-textColor font-medium md:text-lg transition-all ${
                showDropDowns?.subCategory
                  ? "scale-100 max-h-52 h-full md:p-2"
                  : "scale-0 h-0 p-0"
              } duration-300 ease-in-out origin-top `}
            >
              {activeSubcategories !== null ? (
                activeSubcategories?.subcategories.map((category) => (
                  <p
                    key={category?._id}
                    className={` ${
                      searchParams?.subcategory === category?._id &&
                      "bg-gray-200"
                    } cursor-pointer hover:bg-gray-100 transition-all w-full p-1`}
                    onClick={() => {
                      dispatch(
                        handleChangeSearchParams({
                          subcategory: category?._id,
                        })
                      );
                      handleUpdateAppliedFilters({
                        ...category,
                        filterType: "subcategory",
                      });
                    }}
                  >
                    {category?.name}
                  </p>
                ))
              ) : (
                <p className="text-sm font-light text-center w-full">
                  {searchParams?.category === ""
                    ? "Please choose one category"
                    : "No subcategories for selected category."}
                </p>
              )}
            </div>
          </div>
          <hr />
          {/* location */}
          <div className="w-full space-y-2">
            <p
              onClick={() => {
                setShowDropDowns({
                  ...showDropDowns,
                  location: !showDropDowns.location,
                });
              }}
              className=" cursor-pointer flex items-center justify-between w-full md:text-xl font-semibold"
            >
              <span>Locaiton</span>
              <IoIosArrowDown
                className={`text-xl cursor-pointer ${
                  showDropDowns.location ? "rotate-0" : "rotate-180"
                } `}
              />{" "}
            </p>
            <div
              className={`space-y-1 text-textColor font-medium md:text-lg transition-all ${
                showDropDowns?.location
                  ? "scale-100 md:h-72 h-[16rem] md:p-2 "
                  : "scale-0 h-0 p-0"
              } duration-300 ease-in-out origin-top `}
            >
              {/* country */}
              <div className="space-y-2">
                <label htmlFor="country" className="Label">
                  Country
                </label>
                <select
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        country: e.target.value,
                        state: "",
                        city: "",
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: e.target.value,
                      filterType: "country",
                    });
                  }}
                  name="country"
                  id=""
                  className="input_field"
                >
                  <option label="select country"></option>
                  {countryList.map((country) => (
                    <option
                      // selected={country === user?.country}
                      selected={country?.country === searchParams?.country}
                      key={country.country}
                      value={country?.country}
                    >
                      {country?.country}
                    </option>
                  ))}
                </select>
                {/* {user == null ? (
              <p className="text-lg border rounded-lg p-1">{user?.country}</p>
            ) : (
              <select
                onChange={(e) => {
                  dispatch(
                    handleChangeSearchParams({
                      country: e.target.value,
                      state: "",
                      city: "",
                    })
                  );
                  handleUpdateAppliedFilters({
                    name: e.target.value,
                    filterType: "location",
                  });
                }}
                name="country"
                id=""
                className="input_field"
              >
                {countries.map((country) => (
                  <option key={country?.name} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            )} */}
              </div>
              {/* State */}
              <div className="space-y-2">
                <label htmlFor="state" className="Label">
                  State
                </label>
                <select
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        state: e.target.value,
                        city: "",
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: e.target.value,
                      filterType: "state",
                    });
                  }}
                  name="state"
                  id=""
                  className="input_field"
                >
                  <option label="select state"></option>
                  {countryList
                    .find((c) => c.country == searchParams?.country)
                    ?.states.map((state) => (
                      <option
                        // selected={state === user?.state}
                        selected={state?.state === searchParams?.state}
                        key={state?.state}
                        value={state?.state}
                      >
                        {state?.state}
                      </option>
                    ))}
                </select>
              </div>
              {/* city */}
              <div className="space-y-2">
                <label htmlFor="city" className="Label">
                  City
                </label>
                <select
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        city: e.target.value,
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: e.target.value,
                      filterType: "city",
                    });
                  }}
                  name="city"
                  id=""
                  className="input_field"
                >
                  <option label="select city"></option>
                  {countryList
                    .find((c) => c.country === searchParams?.country)
                    ?.states.find((state) => state.state == searchParams?.state)
                    ?.cities.map((city) => (
                      <option
                        selected={city === searchParams.city}
                        key={city}
                        value={city}
                      >
                        {city}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <hr />
          {/* ratings */}
          <div className="w-full space-y-2">
            <p
              onClick={() => {
                setShowDropDowns({
                  ...showDropDowns,
                  rating: !showDropDowns.rating,
                });
              }}
              className=" cursor-pointer flex items-center justify-between w-full md:text-xl font-semibold"
            >
              <span>Ratings</span>
              <IoIosArrowDown
                className={`text-xl cursor-pointer ${
                  showDropDowns.rating ? "rotate-0" : "rotate-180"
                } `}
              />{" "}
            </p>
            <div
              className={`space-y-1 text-textColor font-medium md:text-lg transition-all ${
                showDropDowns?.rating
                  ? "scale-100 h-52 md:p-2 "
                  : "scale-0 h-0 p-0"
              } duration-300 ease-in-out origin-top `}
            >
              {/* {ratings.map((rate) => (
            <div key={rate} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-400 border "
                onChange={(e) => {
                  console.log(e.target.checked, rate);
                  dispatch(
                    // handleChangeSearchParams({
                    //   rating: e.target.checked ? [rate] : [""],
                    // })
                    handleChangeSearchParams({
                      rating:
                        e.target.checked && rate === "all"
                          ? ["all"]
                          : rate === "all" && !e.target.checked
                          ? [" "]
                          : e.target.checked
                          ? [
                              ...searchParams?.rating.filter(
                                (rate) => rate !== "all"
                              ),
                              rate,
                            ]
                          : searchParams?.rating.filter((rate1) =>
                              rate == "all" ? rate1 === rate : rate1 === rate
                            ),
                    })
                  );

                  handleUpdateAppliedFilters({
                    name: rate,
                    filterType: "rating",
                  });
                }}
                checked={
                  searchParams?.rating.includes(rate) ||
                  searchParams?.rating.includes("all")
                }
              />
              <p className="text-textColor  capitalize">{rate}</p>
              {rate !== "all" &&
                new Array(rate)
                  .fill("")
                  .map((star) => (
                    <AiFillStar className="text-yellow-400 text-xl" />
                  ))}
            </div>
          ))} */}
              {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-green-400 border "
                  id="all"
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: e.target.checked ? [1, 2, 3, 4, 5] : [],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "all",
                      filterType: "rating",
                    });
                  }}
                  checked={[1, 2, 3, 4, 5].every((num) =>
                    searchParams?.rating.includes(num)
                  )}
                />
                <label className="text-textColor" htmlFor="all">
                  All
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams?.rating.includes(5)}
                  id="5"
                  className="w-5 h-5 accent-green-400 border "
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 5)
                          : [...searchParams?.rating, 5],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "5",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  className="text-textColor flex items-center gap-2"
                  htmlFor="5"
                >
                  5
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams?.rating.includes(4)}
                  id="4"
                  className="w-5 h-5 accent-green-400 border "
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 4)
                          : [...searchParams?.rating, 4],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "4",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  htmlFor="4"
                  className="text-textColor flex items-center gap-2"
                >
                  4
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams?.rating.includes(3)}
                  className="w-5 h-5 accent-green-400 border "
                  id="3"
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 3)
                          : [...searchParams?.rating, 3],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "3",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  htmlFor="3"
                  className="text-textColor flex items-center gap-2"
                >
                  3
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams?.rating.includes(2)}
                  className="w-5 h-5 accent-green-400 border "
                  id="2"
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 2)
                          : [...searchParams?.rating, 2],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "2",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  htmlFor="2"
                  className="text-textColor flex items-center gap-2"
                >
                  2
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
                <AiFillStar className="text-yellow-400 text-xl" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-green-400 border "
                  id="1"
                  checked={searchParams?.rating.includes(1)}
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 1)
                          : [...searchParams?.rating, 1],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "1",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  htmlFor="1"
                  className="text-textColor flex items-center gap-2"
                >
                  1
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
              </div> */}
              {new Array(5).fill(0).map((rate, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="w-5 h-5"
                    id={i}
                    name="rate"
                    onChange={(e) => {
                      console.log(i);
                      dispatch(
                        handleChangeSearchParams({
                          rating: i,
                        })
                      );

                      handleUpdateAppliedFilters({
                        name: i,
                        filterType: "rating",
                      });
                    }}
                    checked={searchParams?.rating === i}
                  />
                  <label className="text-textColor" htmlFor={i}>
                    {i === 0 ? "All" : i} {i !== 0 && `& Above`}
                  </label>
                </div>
              ))}
              {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams?.rating.includes(5)}
                  id="5"
                  className="w-5 h-5 accent-green-400 border "
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 5)
                          : [...searchParams?.rating, 5],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "5",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  className="text-textColor flex items-center gap-2"
                  htmlFor="5"
                >
                  5
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams?.rating.includes(4)}
                  id="4"
                  className="w-5 h-5 accent-green-400 border "
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 4)
                          : [...searchParams?.rating, 4],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "4",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  htmlFor="4"
                  className="text-textColor flex items-center gap-2"
                >
                  4
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams?.rating.includes(3)}
                  className="w-5 h-5 accent-green-400 border "
                  id="3"
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 3)
                          : [...searchParams?.rating, 3],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "3",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  htmlFor="3"
                  className="text-textColor flex items-center gap-2"
                >
                  3
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={searchParams?.rating.includes(2)}
                  className="w-5 h-5 accent-green-400 border "
                  id="2"
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 2)
                          : [...searchParams?.rating, 2],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "2",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  htmlFor="2"
                  className="text-textColor flex items-center gap-2"
                >
                  2
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
                <AiFillStar className="text-yellow-400 text-xl" />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-green-400 border "
                  id="1"
                  checked={searchParams?.rating.includes(1)}
                  onChange={(e) => {
                    dispatch(
                      handleChangeSearchParams({
                        rating: !e.target.checked
                          ? searchParams?.rating.filter((rate) => rate !== 1)
                          : [...searchParams?.rating, 1],
                      })
                    );
                    handleUpdateAppliedFilters({
                      name: "1",
                      filterType: "rating",
                    });
                  }}
                />
                <label
                  htmlFor="1"
                  className="text-textColor flex items-center gap-2"
                >
                  1
                  <AiFillStar className="text-yellow-400 text-xl" />
                </label>
              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default Filters;
