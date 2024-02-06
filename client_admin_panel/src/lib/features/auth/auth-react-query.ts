import { useQuery } from "react-query";
import { checkAuthQuery } from "@/api/auth/check-auth";

export function useCheckAuth() {
  return useQuery("auth", checkAuthQuery, {
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    keepPreviousData: true,
  });
}
