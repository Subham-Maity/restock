export interface CartItem {
  product: any;
  user: string | number | undefined;
  quantity: number;
}

export interface CartState {
  status: "idle" | "loading";
  items: CartItem[];
  value: number;
}
