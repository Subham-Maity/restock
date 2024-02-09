import { Application } from "express";
import restock from "../routes";
import { isAuth } from "../../helper/protect/isAuth";

export const setupRouter = (app: Application) => {
  app.use("/api/v1/products", isAuth, restock.Product);
  app.use("/api/v1/users", isAuth, restock.user);
  app.use("/api/v1/orders", isAuth, restock.order);
  app.use("/api/v1/categories", isAuth, restock.category);
  app.use("/api/v1/brands", isAuth, restock.brand);
  app.use("/api/v1/banner", restock.banner);
  app.use("/api/v1/auth", restock.auth);
  app.use("/api/v1/cart", isAuth, restock.cart);
  app.get("/", (_, res) => {
    res.send("Yes you are connected to the app! 🚀");
  });
};
