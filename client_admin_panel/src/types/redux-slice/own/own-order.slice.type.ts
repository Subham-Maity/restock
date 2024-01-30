export interface OrderState {
  status: "idle" | "loading";
  userOrders: any[] | null;
}
