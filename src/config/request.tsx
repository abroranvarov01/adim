import axios from "axios";
import Cookies from "js-cookie";
const request = axios.create({
  baseURL: "http://localhost:8000",
});

request.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (config.url !== "/api/admin-login/" && token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default request;
