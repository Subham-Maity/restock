//🔥 Pagination of products

export const paginateProducts = (query: any, req: any) => {
  if (req.query._page && req.query._limit) {
    const pageSize = Number(req.query._limit);
    const page = Number(req.query._page);
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  return query;
};
