"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRouter = void 0;
const routes_1 = __importDefault(require("../routes"));
const protected_1 = require("../services/protect/protected");
const setupRouter = (app) => {
    app.use("/api/v1/products", routes_1.default.Product);
    app.use("/api/v1/users", protected_1.isAuth, routes_1.default.user);
    app.use("/api/v1/orders", routes_1.default.order);
    app.use("/api/v1/categories", routes_1.default.category);
    app.use("/api/v1/brands", routes_1.default.brand);
    app.use("/api/v1/banner", routes_1.default.banner);
    app.use("/api/v1/auth", routes_1.default.auth);
    app.use("/api/v1/cart", protected_1.isAuth, routes_1.default.cart);
    app.get("/", (_, res) => {
        res.send("Yes you are connected to the app! 🚀");
    });
};
exports.setupRouter = setupRouter;
