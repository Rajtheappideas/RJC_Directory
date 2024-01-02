import React from "react";
import Banner from "../components/Home/Banner";
import Category from "../components/Home/Category";
import Latest_Listing from "../components/Home/Latest_Listing";
import Business from "../components/Home/Business";
import Download from "../components/Home/Download";
import TestiMonials from "../components/Home/TestiMonials";
import NewLetter from "../components/NewLetter";

const Home = () => {
  return (
    <div className="lg:space-y-20 space-y-10">
      <Banner />
      <Category />
      <div className="bg-bgGray w-full">
        <Latest_Listing />
      </div>
      <Business />
      <div className="bg-bgGray w-full">
        <Download />
      </div>
      <TestiMonials />
      <NewLetter />
    </div>
  );
};

export default Home;
