import React from "react";
import SingleItemBox from "../SingleItemBox";
import { GoStarFill } from "react-icons/go";

const Favorites = () => {
  const listingData = [
    {
      id: 1,
      image: require("../../assets/images/latest_slider/Rectangle 375.png"),
      title: "Home appliances repair",
      des: "304 Kent St, Sydney NSW 2000.Austrakia",
      review: <GoStarFill />,
      rating: "4.0 (58)",
    },
    {
      id: 2,
      image: require("../../assets/images/latest_slider/Rectangle 375 (1).png"),
      title: "Furniture dealer",
      des: "304 Kent St, Sydney NSW 2000.Austrakia",
      review: <GoStarFill />,
      rating: "2.0 (16)",
    },
    {
      id: 3,
      image: require("../../assets/images/latest_slider/Rectangle 375 (2).png"),
      title: "Pest control service",
      des: "304 Kent St, Sydney NSW 2000.Austrakia",
      review: <GoStarFill />,
      rating: "4.0 (116)",
    },
    {
      id: 4,
      image: require("../../assets/images/latest_slider/Rectangle 375 (3).png"),
      title: "Home appliances repair",
      des: "304 Kent St, Sydney NSW 2000.Austrakia",
      review: <GoStarFill />,
      rating: "3.0 (14)",
    },
    {
      id: 5,
      image: require("../../assets/images/latest_slider/Rectangle 375.png"),
      title: "Furniture dealer",
      des: "304 Kent St, Sydney NSW 2000.Austrakia",
      review: <GoStarFill />,
      rating: "4.0 (58)",
    },
  ];
  return (
    <div className="lg:space-y-6 space-y-3 overflow-y-auto">
      <p className="font-semibold text-2xl">Favorites</p>
      <div className="w-full grid custom_scrollbar py-5 lg:grid-cols-3 md:grid-cols-2 gap-3 overflow-y-auto max-h-[80vh]">
        {listingData.map((item) => (
          <SingleItemBox key={item?.id} data={item} boxType="grid" />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
