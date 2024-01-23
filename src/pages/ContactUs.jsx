import React, { useEffect, useRef, useState } from "react";
import TItleSection from "../components/TitleSection";
import contactus from "../assets/images/contactus.jpg";
import NewLetter from "../components/NewLetter";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import useAbortApiCall from "../hooks/useAbortApiCall";
import ValidationSchema from "../ValidationSchema";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import { GetUrl, PostUrl } from "../BaseUrl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  const dispatch = useDispatch();

  const { AbortControllerRef, abortApiCall } = useAbortApiCall();
  const captchaRef = useRef(null);

  const { contactUsSchema } = ValidationSchema();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    reset,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(contactUsSchema),
    defaultValues: {
      email: "",
      comments: "",
      fname: "",
      lname: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    const { phone, email, comments, fname, lname } = data;

    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      toast.remove();
      toast.error("phone is invalid");
      return true;
    } else if (
      (getValues("mobile") !== "" && !isPossiblePhoneNumber(phone)) ||
      !isValidPhoneNumber(phone)
    ) {
      toast.remove();
      toast.error("phone is invalid");
      return true;
    }
    setLoading(true);
    try {
      const { data } = await PostUrl("contact", {
        data: { email, fname, lname, phone, comments },
      });
      setLoading(false);
      toast.success(data?.message);
      reset();
      // captchaRef?.current?.props?.grecaptcha?.reset();
      resetField("phone", undefined);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  function handleChange(value) {
    setValue("captcha", value, {
      shouldTouch: false,
      shouldDirty: false,
      shouldValidate: false,
    });
    clearErrors("captcha");
  }

  const getContent = async () => {
    // setLoading(true);
    try {
      const { data } = await GetUrl("contact");
      setContent(data?.contact);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getContent();
    return () => {
      abortApiCall();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact us - RJC Directory</title>
      </Helmet>
      <div className="w-full lg:space-y-14 space-y-7">
        <TItleSection image={contactus} title="contact us" />
        <div className="lg:space-y-14 space-y-7 container mx-auto xl:px-0 md:px-10 px-5 w-full">
          <div className="rounded-lg border md:space-y-6 space-y-3 xl:w-1/2 md:w-3/4 w-full mx-auto shadow-lg md:p-5 p-3">
            <p className="font-semibold text-3xl">Get in touch</p>
            <hr />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid w-full lg:grid-cols-2  gap-4"
            >
              <div className="w-full space-y-1">
                <label htmlFor="firstName" className="Label">
                  first name*
                </label>
                <input
                  type="text"
                  className="input_field"
                  placeholder="Type here..."
                  {...register("fname")}
                  name="fname"
                />
                <p className="error">{errors?.fname?.message}</p>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="lastname" className="Label">
                  last name*
                </label>
                <input
                  type="text"
                  className="input_field"
                  placeholder="Type here..."
                  {...register("lname")}
                />
                <p className="error">{errors?.lname?.message}</p>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="email" className="Label">
                  email*
                </label>
                <input
                  type="email"
                  className="input_field"
                  placeholder="Type here..."
                  {...register("email")}
                />
                <p className="error">{errors?.email?.message}</p>
              </div>
              <div className="w-full space-y-1">
                <label htmlFor="phone" className="Label">
                  phone number*
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    validate: (value) => isValidPhoneNumber(value),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      country={"in"}
                      onChange={(value) => {
                        onChange((e) => {
                          setValue("phone", "+".concat(value));
                        });
                      }}
                      value={getValues().phone}
                      autocompleteSearch={true}
                      countryCodeEditable={false}
                      enableSearch={true}
                      inputStyle={{
                        width: "100%",
                        padding: "22px 0 22px 50px",
                        borderRadius: "5px",
                        fontSize: "1rem",
                      }}
                      buttonStyle={{ background: "white" }}
                      dropdownStyle={{
                        background: "white",
                        color: "#13216e",
                        fontWeight: "600",
                        padding: "0px 0px 0px 10px",
                      }}
                    />
                  )}
                />
                <p className="error">{errors?.phone?.message}</p>
              </div>
              <div className="w-full space-y-1 lg:col-span-2">
                <label htmlFor="commnets" className="Label">
                  comments*
                </label>
                <textarea
                  className="input_field max-h-[10rem] min-h-[10rem]"
                  placeholder="Type here..."
                  {...register("comments")}
                />
                <p className="error">{errors?.comments?.message}</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="green_button lg:w-1/2 w-full"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
            {/* <p className="text-textColor text-lg">
            Please check the box below to proceed.
          </p> */}
          </div>
          <div className="relative w-full lg:h-auto h-80 flex items-center justify-center">
            <img
              src={require("../assets/images/contactus1.png")}
              alt=""
              className="z-0 w-full h-full"
            />
            <div className="absolute text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-auto flex flex-col items-center gap-3">
              <img
                src={require("../assets/images/mail.png")}
                alt=""
                className="z-0 md:w-24 w-20 md:h-24 h-20"
              />
              <p className="md:text-3xl text-xl font-semibold whitespace-nowrap">
                For any query email us
              </p>
              <p>
                <a href={`mailto:${content?.email}`} className="text-lg">
                  {/* loremipsum@mail.com */}
                  {content?.email}
                </a>
              </p>
            </div>
          </div>
        </div>
        <NewLetter />
      </div>
    </>
  );
};

export default ContactUs;
