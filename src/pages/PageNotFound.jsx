import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-5 items-center justify-center md:text-4xl text-2xl">
      Page Not Found
      <Link to="/">
        <button className="green_button md:w-60">Home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
