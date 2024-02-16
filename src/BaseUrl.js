import axios from "axios";

// const language = JSON.parse(window.localStorage.getItem("lang"));

export default axios.defaults.baseURL =
  "https://rjc-directory-website.onrender.com";

export const PostUrl = axios.create({
  baseURL: `https://rjc-directory-website.onrender.com/api/`,
  // baseURL: `http://192.168.29.200:3000/api/`,
  method: "POST",
//   headers: {
//     "Accept-Language": language,
//   },
});

export const GetUrl = axios.create({
  // baseURL: "http://192.168.29.200:3000/api/",
  baseURL: "https://rjc-directory-website.onrender.com/api/",
  method: "GET",
//   headers: {
//     "Accept-Language": language,
//   },
});
export const DeleteUrl = axios.create({
  // baseURL: "http://192.168.29.200:3000/api/",
  baseURL: "https://rjc-directory-website.onrender.com/api/",
  method: "DELETE",
//   headers: {
//     "Accept-Language": language,
//   },
});
