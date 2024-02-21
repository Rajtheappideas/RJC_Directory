import React from "react";
import { useSelector } from "react-redux";

const Offers = () => {
  const { merchantDetails } = useSelector((s) => s.root.merchant);

  return (
    <div className="w-full space-y-2">
      <p className="font-semibold md:text-3xl text-xl">Offers</p>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {merchantDetails?.offers.length > 0 ? (
          merchantDetails?.offers.map((offer) => (
            <div
              key={offer?._id}
              className="border-2 space-y-2 border-gray-200 rounded-lg p-2 bg-gray-50"
            >
              <p className="text-xl font-semibold">{offer?.title}</p>
              <p className="font-medium text-lg">{offer?.description}</p>
            </div>
          ))
        ) : (
          <div className="loading col-span-full">No Offers right now</div>
        )}
      </div>
    </div>
  );
};

export default Offers;
