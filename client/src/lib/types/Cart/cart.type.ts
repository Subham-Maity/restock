export interface CartItem {
  id: any;
  productId: any;

}

export interface CartState {
  status: "idle" | "loading";
  items: CartItem[];
  value: number;
}
