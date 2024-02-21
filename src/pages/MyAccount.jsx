import React, { useEffect, useState } from "react";
import TItleSection from "../components/TitleSection";
import bgimage from "../assets/images/my_account.jpg";
import NewLetter from "../components/NewLetter";
import { LiaUserCircleSolid } from "react-icons/lia";
import { GiSettingsKnobs } from "react-icons/gi";
import { PiHeartStraightThin, PiChatCenteredDotsThin } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { MdLogout } from "react-icons/md";
import ManageAccount from "../components/Myaccount/ManageAccount";
import MyPreferences from "../components/Myaccount/MyPreferences";
import MyReviews from "../components/Myaccount/MyReviews";
import Favorites from "../components/Myaccount/Favorites";
import ChangePassword from "../components/Myaccount/ChangePassword";
import WriteReviewModal from "../components/WriteReviewModal";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { handleGetPreference, handleLogout } from "../redux/AuthSlice";
import useAbortApiCall from "../hooks/useAbortApiCall";
import { handleGetReviews } from "../redux/ReviewSlice";
import { handleGetFavs } from "../redux/MerchantSlice";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [reviewBox, setShowReviewBox] = useState(false);

  const [showMenu, setShowMenu] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector((s) => s.root.auth);

  const { abortApiCall } = useAbortApiCall();

  function hanldeLogoutFn() {
    if (!window.confirm("are you sure")) return;
    toast.loading("logout...");
    setTimeout(() => {
      dispatch(handleLogout());
      navigate("/sign-in");
      toast.remove();
    }, 1000);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setShowMenu(true);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [showMenu]);

  useEffect(() => {
    if (user !== null) {
      dispatch(handleGetPreference({ token }));
      dispatch(handleGetReviews({ token }));
      dispatch(handleGetFavs({ token }));
    }
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <>
      {reviewBox && <WriteReviewModal setShowReviewBox={setShowReviewBox} />}

      <div className="relative md:space-y-10 space-y-5">
        <TItleSection image={bgimage} title="My Account" />
        <div className="xl:w-10/12 w-full h-full flex xl:flex-row flex-col items-start gap-3 container mx-auto xl:px-0 md:px-10 px-5">
          {/* <div className="xl:w-10/12 w-full absolute z-0 md:top-60 top-48 left-1/2 -translate-x-1/2 flex xl:flex-row flex-col items-start gap-3 container mx-auto xl:px-0 md:px-10 px-5"> */}
          {/* tabs */}
          <div className="xl:w-3/12 w-full bg-white p-5 space-y-3 border shadow-xl">
            <p
              onClick={() => setShowMenu(!showMenu)}
              className="font-semibold md:text-2xl w-full flex items-center justify-between"
            >
              <span>Main menu</span>
              <AiOutlineDown role="button" className="xl:hidden block" />
            </p>
            {showMenu && (
              <ul className={`space-y-1 select-none`}>
                <li
                  onClick={() => setActiveTab("account")}
                  className={`flex items-center transition-all cursor-pointer gap-3 md:text-lg md:p-3 p-1 ${
                    activeTab === "account" && "bg-blueColor/10 font-semibold"
                  } hover:bg-blueColor/10 hover:font-semibold`}
                >
                  <LiaUserCircleSolid className="md:w-10 md:h-10 h-7 w-7" /> Manage Account
                </li>
                <li
                  onClick={() => setActiveTab("preference")}
                  className={`flex items-center transition-all cursor-pointer gap-3 md:text-lg md:p-3 p-1 ${
                    activeTab === "preference" && "bg-blueColor/10 font-semibold"
                  } hover:bg-blueColor/10 hover:font-semibold`}
                >
                  <GiSettingsKnobs className="md:w-8 md:h-8 h-6 w-6 rotate-90" /> My
                  Preferences
                </li>
                <li
                  onClick={() => setActiveTab("review")}
                  className={`flex items-center transition-all cursor-pointer gap-3 md:text-lg md:p-3 p-1 ${
                    activeTab === "review" && "bg-blueColor/10 font-semibold"
                  } hover:bg-blueColor/10 hover:font-semibold`}
                >
                  <PiChatCenteredDotsThin className="md:w-8 w-6 md:h-8 h-6" /> My Reviews
                </li>
                <li
                  onClick={() => setActiveTab("favorite")}
                  className={`flex items-center transition-all cursor-pointer gap-3 md:text-lg md:p-3 p-1 ${
                    activeTab === "favorite" && "bg-blueColor/10 font-semibold"
                  } hover:bg-blueColor/10 hover:font-semibold`}
                >
                  <PiHeartStraightThin className="md:w-8 w-6 md:h-8 h-6" /> Favorites
                </li>
                <li
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center transition-all cursor-pointer gap-3 md:text-lg md:p-3 p-1 ${
                    activeTab === "password" && "bg-blueColor/10 font-semibold"
                  } hover:bg-blueColor/10 hover:font-semibold`}
                >
                  <CiLock className="md:w-8 w-6 md:h-8 h-6" /> Change Password
                </li>
                <li
                  className={`flex items-center transition-all cursor-pointer gap-3 text-red-500 md:text-lg md:p-3 p-1 hover:bg-red-500/10`}
                  onClick={() => hanldeLogoutFn()}
                >
                  <MdLogout className="md:w-8 w-6 md:h-8 h-6" /> Logout
                </li>
              </ul>
            )}
          </div>
          {/* sections */}
          <div className="xl:w-9/12 w-full h-full bg-white p-4 border shadow-xl">
            {activeTab == "account" && <ManageAccount />}
            {activeTab == "preference" && <MyPreferences />}
            {activeTab == "review" && (
              <MyReviews setShowReviewBox={setShowReviewBox} />
            )}
            {activeTab == "favorite" && <Favorites />}
            {activeTab == "password" && <ChangePassword />}
          </div>
        </div>
        {/* <div className="h-screen"></div> */}
        {/* news letter */}
        <NewLetter />
      </div>
    </>
  );
};

export default MyAccount;
