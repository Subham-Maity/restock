//🔥 Sorting the products

export const sortProducts = (query: any, req: any) => {
  if (req.query._sort && req.query._order) {
    const sortKey = req.query._sort as string;
    const sortOrder = req.query._order as string;
    const sortCriteria: { [key: string]: "asc" | "desc" } = {};
    sortCriteria[sortKey] = sortOrder as "asc" | "desc";
    query = query.sort(sortCriteria);
  }
  return query;
};
