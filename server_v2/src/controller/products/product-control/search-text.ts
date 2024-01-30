//🔥 Searching the products
//Faster than regex search but only works with text indexes
export const searchProducts_Text = (query: any, req: any) => {
  if (req.query.q) {
    query = query.where({ $text: { $search: req.query.q } });
  }
  return query;
};
