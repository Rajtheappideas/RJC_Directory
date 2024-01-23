import React, { useEffect, useState } from "react";
import TItleSection from "../components/TitleSection";
import aboutus from "../assets/images/aboutus.jpg";
import NewLetter from "../components/NewLetter";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAboutus } from "../redux/CmsSlice";
import toast from "react-hot-toast";
import { GetUrl } from "../BaseUrl";

const AboutUs = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const getContent = async () => {
    setLoading(true);
    try {
      const { data } = await GetUrl("about");
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
    <>
      <Helmet>
        <title>About us - RJC Directory</title>
      </Helmet>
      <div className="w-full lg:space-y-14 space-y-7">
        {loading ? (
          <div className="w-full text-center text-2xl font-semibold">
            Loading...
          </div>
        ) : (
          <>
            <TItleSection image={aboutus} title="about us" />
            {/* <TItleSection image={content?.image} title={content?.title} /> */}
            <div
              // dangerouslySetInnerHTML={{ __html: content?.content }}
              className="lg:space-y-14 space-y-7 container mx-auto xl:px-0 md:px-10 px-5 w-full"
            >
              <div className="w-full">
                <p className="text-textColor text-opacity-50 lg:w-10/12 text-center mx-auto">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quibusdam temporibus quia dolores ea mollitia id eveniet
                  magnam odit ullam impedit enim dolore, ipsa ducimus
                  accusantium quae cum at nihil similique. Lorem ipsum dolor,
                  sit amet consectetur adipisicing elit. Quibusdam temporibus
                  quia dolores ea mollitia id eveniet magnam odit ullam impedit
                  enim dolore, ipsa ducimus accusantium quae cum at nihil
                  similique. Lorem ipsum dolor, sit amet consectetur adipisicing
                  elit.
                </p>
              </div>
              <div className="w-full grid lg:grid-cols-2 place-items-center items-center xl:gap-20 md:gap-10 gap-5">
                <img
                  src={require("../assets/images/aboutus1.jpg")}
                  alt=""
                  className="w-full h-full"
                />
                <div className="w-full text-left text-textColor space-y-6">
                  <p className="uppercase font-bold text-4xl">
                    Lorem ipsum text
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Asperiores reprehenderit cum necessitatibus? Ut eos dolor ex
                    reiciendis nihil delectus, distinctio obcaecati voluptate
                    deserunt mollitia eaque magnam totam odit saepe
                    exercitationem. Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Asperiores reprehenderit cum
                    necessitatibus? Ut eos dolor ex reiciendis nihil delectus,
                    distinctio obcaecati voluptate deserunt mollitia eaque
                    magnam totam odit saepe exercitationem. Lorem ipsum dolor
                    sit amet consectetur, adipisicing elit. Asperiores
                    reprehenderit cum necessitatibus? Ut eos dolor ex reiciendis
                    nihil delectus, distinctio obcaecati voluptate deserunt
                    mollitia eaque magnam totam odit saepe exercitationem.
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsa et quae quisquam iusto, dolorum commodi recusandae
                    fugit, veniam, illo a est deserunt blanditiis dolorem omnis
                    accusamus deleniti dicta maiores. Similique.
                  </p>
                </div>
              </div>
              <div className="w-full grid lg:grid-cols-2 place-items-center items-center xl:gap-20 md:gap-10 gap-5">
                <img
                  src={require("../assets/images/aboutus1.jpg")}
                  alt=""
                  className="w-full h-full lg:hidden "
                />
                <div className="w-full text-left text-textColor space-y-6">
                  <p className="uppercase font-bold text-4xl">
                    Lorem ipsum text
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Asperiores reprehenderit cum necessitatibus? Ut eos dolor ex
                    reiciendis nihil delectus, distinctio obcaecati voluptate
                    deserunt mollitia eaque magnam totam odit saepe
                    exercitationem. Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Asperiores reprehenderit cum
                    necessitatibus? Ut eos dolor ex reiciendis nihil delectus,
                    distinctio obcaecati voluptate deserunt mollitia eaque
                    magnam totam odit saepe exercitationem. Lorem ipsum dolor
                    sit amet consectetur, adipisicing elit. Asperiores
                    reprehenderit cum necessitatibus? Ut eos dolor ex reiciendis
                    nihil delectus, distinctio obcaecati voluptate deserunt
                    mollitia eaque magnam totam odit saepe exercitationem.
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Ipsa et quae quisquam iusto, dolorum commodi recusandae
                    fugit, veniam, illo a est deserunt blanditiis dolorem omnis
                    accusamus deleniti dicta maiores. Similique.
                  </p>
                </div>
                <img
                  src={require("../assets/images/aboutus1.jpg")}
                  alt=""
                  className="w-full h-full lg:block hidden"
                />
              </div>
            </div>
          </>
        )}
        <NewLetter />
      </div>
    </>
  );
};

export default AboutUs;
