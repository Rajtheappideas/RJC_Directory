import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiMail } from "react-icons/ci";
import { PostUrl } from "../BaseUrl";

const NewLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("email", email);
      await PostUrl("newsletter", { data: formdata });
      toast.success("Message sent.");
      setLoading(false);
      setEmail("");
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <div
      className="bg-[#004D7F] lg:py-16 py-5 p-5 relative text-center  text-black lg:space-y-5 space-y-2"
      style={{
        backgroundImage: "url(./newlatter.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <div className="space-y-5 container mx-auto xl:px-0 px-5 w-full">
        <div className="space-y-3">
          <p className="lg:text-3xl  text-lg text-white font-bold">
            Subscribe our newsletter
          </p>
          <p className="text-white text-base">Subscribe for get update info</p>
        </div>
        <div className="bg-white border border-[#2588C9] rounded-full flex mx-auto justify-around items-center flex-row 2xl:w-[50%] lg:w-[40%] md:w-2/3 w-full px-2 py-2">
          <form
            onSubmit={handleSubmit}
            className="gap-3 flex md:justify-between justify-center  items-center w-full "
          >
            <div className="flex gap-3 flex-1 pl-3">
              <CiMail className="text-3xl" />
              <input
                type="text"
                placeholder="Your Email Address"
                className="outline-none text-sm w-full"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              type="submit"
              className="darkBlue_button md:flex-none w-fit"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLetter;
