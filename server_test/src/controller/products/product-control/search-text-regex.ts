//Try $text search first, if no results then fall back to regex search
//Slower than text search but better than regex search
// and works without text indexes and can search for partial words
import {Request} from "express";
import {QueryParams} from "../../../types/products/QueryParam";

export const searchProducts_Text_Regex = (
  query: any,
  req: Request<{}, {}, {}, QueryParams>,
) => {
  if (req.query.q) {
    // Try $text search first
    const textSearchQuery = query
      .clone()
      .where({ $text: { $search: req.query.q } });

    // If no results from $text search, fall back to regex search
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
