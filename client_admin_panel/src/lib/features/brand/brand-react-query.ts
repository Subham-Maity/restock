import { useQuery } from "react-query";
import { fetchBrandsQuery } from "@/api/brand/fetch-brand";

export function useBrands() {
  return useQuery("brands", fetchBrandsQuery);
}
