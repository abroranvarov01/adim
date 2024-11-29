import axios from "axios";
import Cookies from "js-cookie";
const request = axios.create({
  baseURL: "http://localhost:8000",
});

request.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default request;
