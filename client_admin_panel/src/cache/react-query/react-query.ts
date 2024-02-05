import { QueryClient } from "react-query";
import { queryOptions } from "@/cache/react-query/setting";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: queryOptions,
  },
});
