import React from "react";
import { CiMail } from "react-icons/ci";

const NewLetter = () => {
  return (
    <div
      className="bg-[#004D7F] lg:py-16 py-5 p-5 relative text-center  text-black lg:space-y-5 space-y-2"
      style={{
        backgroundImage: "url(./newlatter.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <p className="lg:text-3xl job_details text-lg text-white font-bold">
            Subscribe our newsletter
          </p>
          <p className="text-white text-sm">Subscribe for get update info</p>
        </div>
        <div>
          {/* <Link
            to="/my-account"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button
              type="submit"
              className="focus:outline-none bg-white text-primary_color font-medium rounded-lg active:scale-90 transition text-sm md:px-10 px-5 md:py-3 py-2"
            >
              Submit Your CV
            </button>
          </Link> */}
          <form
            // onSubmit={hanldeFindJob}
            className="bg-white border bottom-4 border-[#2588C9] rounded-full flex mx-auto justify-around items-center xl:flex-row xl:w-2/6 flex-col w-full px-2 py-2"
          >
            <div className="gap-3 flex justify-between xl:flex-row flex-col items-center w-full">
              <div className="flex gap-3">
                <CiMail className="text-2xl" />
                <input
                  type="text"
                  placeholder="All Cities"
                  className="outline-none text-sm w-full"
                  // value={locationKeyword ? locationKeyword : usersSearch.location}
                  // onChange={(e) =>
                  //   dispatch(handleChangeLocationKeyword(e.target.value))
                  // }
                />
              </div>
              <button
                type="submit"
                className="green_button bg-[#004D7F] px-4 hover:bg-blue_button/80 active:scale-90 transition"
                // disabled={findJobLoading || loading}
              >
                {/* {loading ? "Finding..." : "Find Job"} */}
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLetter;
