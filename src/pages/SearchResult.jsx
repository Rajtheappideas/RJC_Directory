import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Filters = lazy(() => import("../components/Search/Filters"));
const Results = lazy(() => import("../components/Search/Results"));
const NewLetter = lazy(() => import("../components/NewLetter"));
const Business = lazy(() => import("../components/Home/Business"));

const SearchResult = () => {
  const [boxType, setBoxType] = useState("grid");

  const { allData, loading } = useSelector((s) => s.root.merchant);
  // console.log(allData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="bg-white container xl:px-0 md:px-10 px-5 mx-auto lg:space-y-8 space-y-5">
        <div>
          <p className="font-bold text-blue-800 text-2xl">
            Search result “Restaurant in New York”
          </p>
          <p className="text-textColor text-lg font-medium opacity-50">
            45 results found
          </p>
        </div>
        <div className="flex w-full xl:flex-row flex-col items-start gap-5">
          {/* filters */}
          <Filters />
          {/* results */}
          <Results setBoxType={setBoxType} boxType={boxType} />
        </div>
        <div className="pt-10">
          <Business />
        </div>
      </div>
      <div className="pt-10">
        <NewLetter />
      </div>
    </div>
  );
};

export default SearchResult;
