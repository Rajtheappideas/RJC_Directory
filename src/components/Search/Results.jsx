import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import SingleItemBox from "../SingleItemBox";
import { BiSolidGridAlt } from "react-icons/bi";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Results = ({ setBoxType, boxType }) => {
  const { allData, loading } = useSelector((s) => s.root.merchant);
  return (
    <div className="xl:w-9/12 w-full space-y-3">
      <div className="bg-gray-100 flex flex-wrap gap-3 items-center justify-between font-semibold text-textColo text-lg w-full p-3 text-left">
        <p>Showing 1 – 9 of 24 results</p>
        <div className="flex items-center gap-2 xl:w-1/2 justify-end">
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
          <span>Sort by </span>
          <select name="sort" id="" className="w-40 border p-2 outline-none">
            <option value="Popularity">Popularity</option>
            <option value="new">new</option>
            <option value="old">old</option>
          </select>
        </div>
      </div>
      <div
        className={`w-full grid ${
          boxType !== "grid" ? "grid-cols-1" : "xl:grid-cols-3 md:grid-cols-2"
        }  md:gap-4 gap-2 pb-10`}
      >
        <SingleItemBox boxType={boxType} />
        <SingleItemBox boxType={boxType} />
        <SingleItemBox boxType={boxType} />
        <SingleItemBox boxType={boxType} />
        <SingleItemBox boxType={boxType} />
        <SingleItemBox boxType={boxType} />
        <SingleItemBox boxType={boxType} />
        <SingleItemBox boxType={boxType} />
        <SingleItemBox boxType={boxType} />
      </div>
      <div className="flex border bg-gray-200 p-3 xl:flex-row flex-col items-center w-full gap-3 justify-between">
        <p className="flex-1 font-semibold">Showing 1 – 9 of 24 results</p>
        <div className="flex md:flex-row flex-col gap-3 items-center justify-between">
          {/* pagination */}
          <ReactPaginate
            // onPageChange={changePage}
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
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={10}
            containerClassName=""
            activeClassName="active"
            className="flex items-center gap-x-3"
            // forcePage={pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
