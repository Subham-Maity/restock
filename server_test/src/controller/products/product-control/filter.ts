//🔥 Filtering the products
export const filterProducts = (query: any, req: any) => {
  if (req.query.category) {
    //example: query.where({category: ["smartphone", "laptop"]})
    //if we get the category query parameter, we will filter the products based on the category
    query = query.where({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.where({ brand: req.query.brand });
  }
  return query;
};
