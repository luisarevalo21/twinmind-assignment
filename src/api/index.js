import axios from "axios";
import { useAuth } from "../context/authContext/useAuth";
const baseURL = "http://localhost:3000/";
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log("Request error: ", error);
    // Do something with request error
    return Promise.reject(error);
  }
);
// // Add a request interceptor
// api.interceptors.request.use(
//   config => {
//     // Do something before request is sent
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

export { api };
