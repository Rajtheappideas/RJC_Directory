import React, { Suspense, lazy, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { handleGetListOfMerchants } from "../redux/MerchantSlice";

const Banner = lazy(() => import("../components/Home/Banner"));
const Category = lazy(() => import("../components/Home/Category"));
const Business = lazy(() => import("../components/Home/Business"));
const LatestListing = lazy(() => import("../components/Home/LatestListing"));
const Download = lazy(() => import("../components/Home/Download"));
const TestiMonials = lazy(() => import("../components/Home/TestiMonials"));
const NewLetter = lazy(() => import("../components/NewLetter"));

const Home = () => {
  const { token } = useSelector((s) => s.root.auth);

  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Home - RJC Directory</title>
      </Helmet>
      <div className="lg:space-y-24 space-y-10">
        <Banner />
        <Category />
        <div className="bg-bgGray w-full">
          <LatestListing />
        </div>
        <Business />
        <div className="bg-bgGray w-full">
          <Download />
        </div>
        <TestiMonials />
        <NewLetter />
      </div>
    </>
  );
};

export default Home;
