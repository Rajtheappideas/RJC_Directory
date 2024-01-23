import React, { useEffect, useState } from "react";
import terms from "../assets/images/terms.jpg";
import TItleSection from "../components/TitleSection";
import NewLetter from "../components/NewLetter";
import { GetUrl } from "../BaseUrl";
import toast from "react-hot-toast";

const TermsConditions = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const getContent = async () => {
    setLoading(true);
    try {
      const { data } = await GetUrl("terms");
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
          <TItleSection image={terms} title={content?.title} />
          <div className="container mx-auto xl:p-0 md:px-10 px-5 w-full lg:space-y-6 space-y-3">
            <div dangerouslySetInnerHTML={{ __html: content?.content }}></div>
          </div>
        </>
      )}
      <NewLetter />
    </div>
  );
};

export default TermsConditions;
