import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";

const Banner = lazy(() => import("../components/Home/Banner"));
const Category = lazy(() => import("../components/Home/Category"));
const Business = lazy(() => import("../components/Home/Business"));
const LatestListing = lazy(() => import("../components/Home/LatestListing"));
const Download = lazy(() => import("../components/Home/Download"));
const TestiMonials = lazy(() => import("../components/Home/TestiMonials"));
const NewLetter = lazy(() => import("../components/NewLetter"));

const Home = () => {
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
