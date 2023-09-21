export interface CartItem {
  id: any;

}

export interface CartState {
  status: "idle" | "loading";
  items: CartItem[];
  value: number;
}
