import React from "react";
import Banner from "../components/Home/Banner";
import Category from "../components/Home/Category";
import LatestListing from "../components/Home/LatestListing";
import Business from "../components/Home/Business";
import Download from "../components/Home/Download";
import TestiMonials from "../components/Home/TestiMonials";
import NewLetter from "../components/NewLetter";
import { Helmet } from "react-helmet";

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
