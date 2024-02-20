// Function to paginate the query
export const paginateQuery = (query: any, req: any) => {
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  return query;
};
