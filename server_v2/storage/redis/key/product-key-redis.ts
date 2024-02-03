export const generateBaseKey = (query: any) => {
  let baseKey = "Product";

  if (Object.keys(query).length === 0) {
    baseKey += "-Fetch";
  } else if (query.q) {
    baseKey += "-Search";
  } else if (query.category || query.brand) {
    baseKey += "-Filter";
  } else if (query._sort) {
    baseKey += "-Sort";
  } else if (query._page || query._limit) {
    baseKey += "-Pagination";
  }

  return baseKey;
};
