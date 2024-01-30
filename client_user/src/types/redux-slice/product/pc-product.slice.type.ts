export interface ProductState {
  products: any[];
  status: "idle" | "loading";
  totalItems: number;
  selectedProduct?: any;
  allProducts: any[];
}
