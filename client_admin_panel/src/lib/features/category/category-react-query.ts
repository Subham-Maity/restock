import { useQuery } from "react-query";
import { fetchCategoriesQuery } from "@/api/categories/fetch-category";

export function useCategory() {
  return useQuery("category", fetchCategoriesQuery);
}
