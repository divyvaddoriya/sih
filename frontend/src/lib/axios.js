import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1" : "/api/v1",
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
	  const token = localStorage.getItem("token");
	  if (token) {
		config.headers.Authorization = `Bearer ${import.meta.env.JWT_SECRET}`;
	  }
	  return config;
	},
	(error) => Promise.reject(error)
  )