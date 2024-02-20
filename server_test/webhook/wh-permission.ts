import express, { Application } from "express";

export const webhook_route_1 = "/api/v1/webhooks/stripe";

export const webhook_route_2 = "/webhook-example-not-present"; //example
export const webhookPermission = (app: Application) => {
  app.use((req, res, next) => {
    //Add your webhook endpoint here
    if (req.path === webhook_route_1 || req.path === webhook_route_2) {
      // replace with your actual webhook endpoint
      express.raw({ type: "application/json" })(req, res, next);
    } else {
      next();
    }
  });
};
