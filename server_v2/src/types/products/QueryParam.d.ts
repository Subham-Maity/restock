export interface QueryParams {
  admin?: string;
  category?: string;
  brand?: string;
  _sort?: string;
  _order?: string;
  _page?: string;
  _limit?: string;
  q?: string;
}

type GenericType<T> = {
  property: T;
};

export interface RequestWithQueryParams extends Request {
  query: QueryParams;
}
