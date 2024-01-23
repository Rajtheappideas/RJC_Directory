import React, { useEffect, useState } from "react";
import TItleSection from "../components/TitleSection";
import NewLetter from "../components/NewLetter";
import privacy from "../assets/images/privacy.jpg";
import { GetUrl } from "../BaseUrl";
import toast from "react-hot-toast";

const PrivacyPolicy = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const getContent = async () => {
    setLoading(true);
    try {
      const { data } = await GetUrl("privacy");
      setContent(data?.page);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className="w-full lg:space-y-14 space-y-7">
      {loading ? (
        <div className="font-semibold text-2xl text-center">Loading...</div>
      ) : (
        <>
          <TItleSection image={privacy} title={content?.title} />
          <div className="container mx-auto xl:p-0 md:px-10 px-5 w-full lg:space-y-6 space-y-3">
            <p className="text-2xl font-semibold capitalize">
              {content?.title}
            </p>
            <div dangerouslySetInnerHTML={{ __html: content?.content }}></div>
            {/* <p className="text-textColor tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum esse
          nostrum a eaque consequatur, nulla provident libero. Repellendus
          praesentium ab reprehenderit vero! Blanditiis officia magnam
          repudiandae amet fuga vel quidem.
        </p>
        <p className="text-textColor tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum esse
          nostrum a eaque consequatur, nulla provident libero. Repellendus
          praesentium ab reprehenderit vero! Blanditiis officia magnam
          repudiandae amet fuga vel quidem.
        </p>
        <p className="text-textColor tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum esse
          nostrum a eaque consequatur, nulla provident libero. Repellendus
          praesentium ab reprehenderit vero! Blanditiis officia magnam
          repudiandae amet fuga vel quidem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum esse nostrum a eaque consequatur,
          nulla provident libero. Repellendus praesentium ab reprehenderit vero!
          Blanditiis officia magnam repudiandae amet fuga vel quidem. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Cum esse nostrum a
          eaque consequatur, nulla provident libero. Repellendus praesentium ab
          reprehenderit vero! Blanditiis officia magnam repudiandae amet fuga
          vel quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Cum esse nostrum a eaque consequatur, nulla provident libero.
          Repellendus praesentium ab reprehenderit vero! Blanditiis officia
          magnam repudiandae amet fuga vel quidem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum esse nostrum a eaque consequatur,
          nulla provident libero. Repellendus praesentium ab reprehenderit vero!
          Blanditiis officia magnam repudiandae amet fuga vel quidem.
        </p>
        <p className="text-textColor tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum esse
          nostrum a eaque consequatur, nulla provident libero. Repellendus
          praesentium ab reprehenderit vero! Blanditiis officia magnam
          repudiandae amet fuga vel quidem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum esse nostrum a eaque consequatur,
          nulla provident libero. Repellendus praesentium ab reprehenderit vero!
          Blanditiis officia magnam repudiandae amet fuga vel quidem. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Cum esse nostrum a
          eaque consequatur, nulla provident libero. Repellendus praesentium ab
          reprehenderit vero! Blanditiis officia magnam repudiandae amet fuga
          vel quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Cum esse nostrum a eaque consequatur, nulla provident libero.
          Repellendus praesentium ab reprehenderit vero! Blanditiis officia
          magnam repudiandae amet fuga vel quidem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum esse nostrum a eaque consequatur,
          nulla provident libero. Repellendus praesentium ab reprehenderit vero!
          Blanditiis officia magnam repudiandae amet fuga vel quidem.
        </p>
        <p className="text-textColor tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum esse
          nostrum a eaque consequatur, nulla provident libero. Repellendus
          praesentium ab reprehenderit vero! Blanditiis officia magnam
          repudiandae amet fuga vel quidem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum esse nostrum a eaque consequatur,
          nulla provident libero. Repellendus praesentium ab reprehenderit vero!
          Blanditiis officia magnam repudiandae amet fuga vel quidem. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Cum esse nostrum a
          eaque consequatur, nulla provident libero. Repellendus praesentium ab
          reprehenderit vero! Blanditiis officia magnam repudiandae amet fuga
          vel quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Cum esse nostrum a eaque consequatur, nulla provident libero.
          Repellendus praesentium ab reprehenderit vero! Blanditiis officia
          magnam repudiandae amet fuga vel quidem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum esse nostrum a eaque consequatur,
          nulla provident libero. Repellendus praesentium ab reprehenderit vero!
          Blanditiis officia magnam repudiandae amet fuga vel quidem.
        </p>
        <p className="text-textColor tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum esse
          nostrum a eaque consequatur, nulla provident libero. Repellendus
          praesentium ab reprehenderit vero! Blanditiis officia magnam
          repudiandae amet fuga vel quidem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum esse nostrum a eaque consequatur,
          nulla provident libero. Repellendus praesentium ab reprehenderit vero!
          Blanditiis officia magnam repudiandae amet fuga vel quidem. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Cum esse nostrum a
          eaque consequatur, nulla provident libero. Repellendus praesentium ab
          reprehenderit vero! Blanditiis officia magnam repudiandae amet fuga
          vel quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Cum esse nostrum a eaque consequatur, nulla provident libero.
          Repellendus praesentium ab reprehenderit vero! Blanditiis officia
          magnam repudiandae amet fuga vel quidem. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Cum esse nostrum a eaque consequatur,
          nulla provident libero. Repellendus praesentium ab reprehenderit vero!
          Blanditiis officia magnam repudiandae amet fuga vel quidem.
        </p> */}
          </div>
        </>
      )}
      <NewLetter />
    </div>
  );
};

export default PrivacyPolicy;
