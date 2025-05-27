import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/";
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
  error => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Remove token and redirect to sign-in
      localStorage.removeItem("token");
      window.location.href = "/"; // or your sign-in route
    }
    return Promise.reject(error);
  }
);

export { api };
