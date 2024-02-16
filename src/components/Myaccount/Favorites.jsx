import React from "react";
import SingleItemBox from "../SingleItemBox";
import { useSelector } from "react-redux";

const Favorites = () => {
  const { favourites, favGetloading } = useSelector((s) => s.root.merchant);
  return (
    <div className="lg:space-y-6 space-y-3 ">
      <p className="font-semibold text-2xl">Favorites</p>
      <div className="w-full grid custom_scrollbar py-5 lg:grid-cols-3 md:grid-cols-2 gap-3 ">
        {favGetloading ? (
          <div className="loading">Loading...</div>
        ) : favourites.length > 0 ? (
          favourites.map((item) => (
            <SingleItemBox key={item?._id} data={item} boxType="grid" />
          ))
        ) : (
          <div className="loading">No Favourites here.</div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
