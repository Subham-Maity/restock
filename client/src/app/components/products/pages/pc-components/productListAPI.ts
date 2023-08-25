export async function fetchAllProducts(): Promise<{ data: any }> {
  const response: Response = await fetch(
    "https://restock-api.onrender.com/products",
  );
  const data = await response.json();
  return { data };
}

//Todo: on server support multiple values
export async function fetchAllProductsByFilter(
  filter: any,
  sort: any,
  pagination: any,
): Promise<{ data: any }> {
  /*filter format = https://restock-api.onrender.com/products?category=laptops
   *Sort -> https://restock-api.onrender.com/products?_sort=price&_order=desc
   * so,${key}=${filter[key]}
   * filter = "category":"laptops"
   * */
  let queryString = "";
  for (let key in filter) {
    //`&` can handle more than one product
    queryString += `${key}=${filter[key]}&`; //it will return something like this : category=laptops&brand=Apple
  }
  for (let key in sort) {
    //`&` can handle more than one product
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    //`&` can handle more than one product
    queryString += `${key}=${pagination[key]}&`;
  }
  const response: Response = await fetch(
    "https://restock-api.onrender.com/products?" + queryString,
  );
  const data = await response.json();
  return { data };
}
