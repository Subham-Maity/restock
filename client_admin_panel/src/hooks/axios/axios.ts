import axios_, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL } from "@/constant/constants";

let axios: AxiosInstance;

if (typeof window !== "undefined") {
  const authToken = localStorage.getItem("authToken");

  axios = axios_.create({
    baseURL: BASE_URL,
    headers: {
      authtoken: authToken || "",
    },
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response) {
        console.error(
          `Response error: ${error.response.status} ${error.response.data}`,
        );
      } else if (error.request) {
        console.error(`Request error: ${error.request}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      return Promise.reject(error);
    },
  );
} else {
  axios = axios_.create({
    baseURL: BASE_URL,
  });
}

export default axios;
