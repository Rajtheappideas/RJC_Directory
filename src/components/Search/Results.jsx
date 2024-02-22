import React, { memo, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import SingleItemBox from "../SingleItemBox";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaGripLines } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeSearchParams } from "../../redux/MerchantSlice";

const Results = memo(({ setBoxType, boxType }) => {
  const { allData, merchants, merchantGetLoading, searchParams } = useSelector(
    (s) => s.root.merchant
  );

  const dispatch = useDispatch();

  // pagination logic
  const productsPerPage = searchParams?.limit;
  const pageCount = Math.ceil(
    parseInt(allData?.totalMerchantCount) / productsPerPage
  );

  const changePage = ({ selected }) => {
    dispatch(handleChangeSearchParams({ page: selected + 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleShowResultInPagination() {
    if (merchantGetLoading || allData?.merchants.length == 0 || allData == null)
      return `Showing 0 - 0 of 0 results`;
    return `Showing ${
      parseInt(allData?.currentPage * searchParams?.limit) -
      searchParams?.limit +
      1
    } - ${
      allData?.currentPage * searchParams?.limit > allData?.totalMerchantCount
        ? allData?.totalMerchantCount
        : allData?.currentPage * searchParams?.limit
    } of ${allData?.totalMerchantCount} results`;
  }

  return (
    <div className="xl:w-9/12 w-full h-full space-y-3">
      <div className="bg-gray-100 flex flex-wrap gap-3 items-center justify-between font-semibold text-textColo md:text-lg w-full md:p-3 p-2 text-left">
        <p>{handleShowResultInPagination()}</p>
        <div className="flex items-center  flex-wrap gap-2 xl:w-1/2  md:justify-end">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              name="sort"
              onChange={(e) => {
                dispatch(
                  handleChangeSearchParams({ limit: e.target.value, page: 1 })
                );
              }}
              id=""
              className="w-fit border p-2 outline-none"
            >
              <option selected={searchParams?.limit === "10"} value="10">
                10
              </option>
              <option selected={searchParams?.limit === "25"} value="25">
                25
              </option>
              <option selected={searchParams?.limit === "50"} value="50">
                50
              </option>
            </select>
          </div>

          <BiSolidGridAlt
            onClick={() => setBoxType("grid")}
            className={`${
              boxType == "grid" ? "text-blueColor" : "text-gray-400"
            }  text-3xl cursor-pointer`}
          />
          <FaGripLines
            onClick={() => setBoxType("list")}
            className={`${
              boxType !== "grid" ? "text-blueColor" : "text-gray-400"
            }  text-3xl cursor-pointer`}
          />
          <div className="flex items-center gap-2">
            <span>Sort by </span>
            <select
              name="sort"
              onChange={(e) => {
                dispatch(
                  handleChangeSearchParams({ sortBy: e.target.value, page: 1 })
                );
              }}
              id=""
              className="w-40 border p-2 outline-none"
            >
              <option
                selected={searchParams?.sortBy === "ratingHighToLow"}
                value="ratingHighToLow"
              >
                High To Low
              </option>
              <option
                selected={searchParams?.sortBy === "ratingLowToHigh"}
                value="ratingLowToHigh"
              >
                Low To High
              </option>
              <option
                selected={searchParams?.sortBy === "popularity"}
                value="popularity"
              >
                Popularity
              </option>
              <option
                selected={searchParams?.sortBy === "newest"}
                value="newest"
              >
                New
              </option>
            </select>
          </div>
        </div>
      </div>
      <div
        className={`w-full grid ${
          boxType !== "grid" ? "grid-cols-1" : "xl:grid-cols-3 md:grid-cols-2"
        }  gap-4 md:pb-10 pb-5`}
      >
        {merchantGetLoading ? (
          new Array(9)
            .fill(0)
            .map((load, i) => (
              <div
                key={i}
                className="w-full animate-pulse h-[50vh] rounded-lg bg-gray-200"
              ></div>
            ))
        ) : merchants.length > 0 ? (
          merchants.map((merchant) => (
            <SingleItemBox
              key={merchant?._id}
              data={merchant}
              boxType={boxType}
            />
          ))
        ) : (
          <div className="loading col-span-full">
            No Merchant finds, try different filtes
          </div>
        )}
      </div>
      <div className="flex border bg-gray-200 p-3 xl:flex-row flex-col items-center w-full gap-3 justify-between">
        <p className="flex-1 font-semibold">{handleShowResultInPagination()}</p>
        <div className="flex md:flex-row flex-col gap-3 items-center justify-between">
          {/* pagination */}
          <ReactPaginate
            onPageChange={changePage}
            previousLabel={
              <p className="bg-white w-10 h-10 p-2.5 rounded-md">
                <BsChevronLeft className="h-5 w-5 rounded-md text-black" />
              </p>
            }
            nextLabel={
              <p className="bg-white w-10 h-10 p-2.5 rounded-md">
                <BsChevronRight className="h-5 w-5 rounded-md text-black" />
              </p>
            }
            pageClassName="bg-white text-black px-2 py-2 rounded-md text-center"
            pageLinkClassName="p-2"
            breakLabel="..."
            breakClassName=""
            breakLinkClassName=""
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            containerClassName=""
            activeClassName="active"
            className="flex items-center gap-x-3"
            forcePage={searchParams?.page - 1}
          />
        </div>
      </div>
    </div>
  );
});

export default Results;
