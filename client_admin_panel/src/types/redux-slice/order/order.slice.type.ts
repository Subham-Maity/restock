export interface Order {
  items: Item[];
  totalAmount: number;
  totalItems: number;
  user: User;
  paymentMethod: string;
  selectedAddress: Address;
  id: number;
  status: string;
}

export interface OrderState {
  status: "idle" | "loading";
  orders: Order[];
  value: number;
  currentOrder: Order | null;
  totalOrders: number;
}
