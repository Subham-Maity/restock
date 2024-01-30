import { BASE_URL } from "@/constant/constants";
import axios from "@/hooks/axios/axios";

export const fetchBanner = async () => {
  let response = await axios.get(`${BASE_URL}/banner`);
  console.log("res", response.data.href);
  return response;
};
