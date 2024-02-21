import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeSearchParams,
  handleGetListOfMerchants,
} from "../redux/MerchantSlice";
import { useNavigate } from "react-router-dom";

const Filters = lazy(() => import("../components/Search/Filters"));
const Results = lazy(() => import("../components/Search/Results"));
const NewLetter = lazy(() => import("../components/NewLetter"));
const Business = lazy(() => import("../components/Home/Business"));

const SearchResult = () => {
  const [boxType, setBoxType] = useState("grid");

  const { allData, merchants, loading, searchParams } = useSelector(
    (s) => s.root.merchant
  );

  const { user, token } = useSelector((s) => s.root.auth);
  // console.log(allData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSearchMerchants() {
    dispatch(handleGetListOfMerchants({ ...searchParams, token }));
  }

  useEffect(() => {
    handleSearchMerchants();
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams]);

  useEffect(() => {
    dispatch(
      handleChangeSearchParams({
        page: 1,
      })
    );
    return () => dispatch(handleChangeSearchParams({ state: "", name: "" }));
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white container xl:px-0 md:px-10 px-5 mx-auto lg:space-y-8 space-y-5">
        <div>
          {/* <p className="font-bold text-blue-800 text-2xl">
            Search result “Restaurant in New York”
          </p> */}
          <p className="text-textColor text-lg font-medium opacity-50">
            {allData?.totalMerchantCount} results found
          </p>
        </div>
        <div className="flex w-full h-full xl:flex-row flex-col items-start gap-5">
          <Filters />
          <Results setBoxType={setBoxType} boxType={boxType} />
        </div>
        <div className="pt-10">
          <Business />
        </div>
      </div>
      <div className="md:pt-10 pt-3">
        <NewLetter />
      </div>
    </div>
  );
};

export default SearchResult;
