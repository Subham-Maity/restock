//Slower than text search but works without text indexes and can search for partial words
export const searchProducts_Regex = (query: any, req: any) => {
  if (req.query.q) {
    const regex = new RegExp(req.query.q, "i"); // 'i' makes it case-insensitive
    query = query.where({
      $or: [
        { title: regex },
        { description: regex },
        { brand: regex },
        { category: regex },
      ],
    });
  }
  return query;
};
