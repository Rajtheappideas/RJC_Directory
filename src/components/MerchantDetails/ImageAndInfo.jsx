import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { useSelector } from "react-redux";
import BaseUrl from "../../BaseUrl";
import moment from "moment";

const ImageAndInfo = () => {
  const [showOpenHours, setShowOpenHours] = useState(true);

  const { merchantDetails, merchantByIdLoading } = useSelector(
    (s) => s.root.merchant
  );
  let today = [];
  useEffect(() => {
    if (!merchantByIdLoading) {
    }
    today = Object.entries(merchantDetails?.openingHours).filter((i) =>
      i[0]
        .toLocaleLowerCase()
        .includes(moment().format("dddd").toLocaleLowerCase())
    )[0];
  }, [merchantByIdLoading]);

  return (
    <div className="w-full transition-all duration-300  ease-in grid xl:grid-cols-2 gap-5 place-items-start items-start">
      <img
        src={BaseUrl.concat(merchantDetails?.images[0])}
        alt=""
        className="w-full h-full rounded-3xl object-cover object-center"
        loading="lazy"
      />
      <div className="space-y-3 w-full">
        <p className="font-semibold md:text-5xl text-3xl">
          {merchantDetails?.name}
        </p>
        <p className="text-blueColor flex flex-wrap items-center text-left text-lg">
          {merchantDetails?.category
            .map((category) => category?.name)
            .join(" / ")}
        </p>
        <p className="flex items-center gap-2">
          <MdLocationPin className="text-3xl" />
          <span className="capitalize">
            {merchantDetails?.address}, {merchantDetails?.city},{" "}
            {merchantDetails?.country}
          </span>
        </p>
        <div
          className="flex items-center gap-2 w-fit"
          // onClick={() => setShowOpenHours((prev) => !prev)}
        >
          {!today[1]?.isClose ? (
            <p className="bg-green-600 w-20 text-white p-2 rounded-lg text-center">
              Open
            </p>
          ) : (
            <p className="bg-red-600 w-20 text-white p-2 rounded-lg text-center">
              Close
            </p>
          )}

          <p className="flex items-center gap-2">
            {today[1]?.isClose ? "" : `Closes at ${today[1]?.closeTime}`}
          </p>
        </div>
        {/* open hours */}
        <div
          className={`md:pl-24 pl-6 text-lg w-full origin-top space-y-2 transition-all ease-in-out duration-300 ${
            showOpenHours ? "scale-100 h-full" : "scale-0 h-0"
          } `}
        >
          <table className="md:w-2/3 w-full">
            <tbody className="w-full">
              {Object.entries(merchantDetails?.openingHours).map((day) => (
                <tr
                  key={day[1]?._id}
                  className={`w-full ${
                    day[0]
                      ?.toLocaleLowerCase()
                      ?.includes(moment().format("dddd").toLocaleLowerCase())
                      ? "font-semibold text-black"
                      : "text-textColor  text-opacity-40"
                  } capitalize `}
                >
                  <td className="w-1/2">{day[0]}</td>
                  <td>
                    {day[1]?.isClose
                      ? "Closed"
                      : `${day[1]?.openTime} - ${day[1]?.closeTime}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* phone & email */}
        <div className="flex transition-all duration-300 ease-in items-center md:flex-row flex-col gap-3 w-full">
          <div className="md:w-1/2 w-full">
            <button className="green_button w-full flex items-center justify-center gap-2">
              <FaPhoneAlt className="text-2xl text-white" />
              <span>{merchantDetails?.call}</span>
            </button>
          </div>
          <div className="md:w-1/2 w-full">
            <button className="blue_button w-full flex items-center justify-center gap-2">
              <MdEmail className="text-white min-w-[1.5rem]" />
              <a href={`mailto:${merchantDetails?.email}`} className="">
                {merchantDetails?.email}
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAndInfo;
