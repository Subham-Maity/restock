// Function to build the base query
import Order from "../../../model/order/order.model";

export const buildBaseQuery = (req: any) => {
  let query = Order.find({ deleted: { $ne: true } });
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  return query;
};
