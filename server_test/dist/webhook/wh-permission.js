"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookPermission = exports.webhook_route_2 = exports.webhook_route_1 = void 0;
const express_1 = __importDefault(require("express"));
exports.webhook_route_1 = "/api/v1/webhooks/stripe";
exports.webhook_route_2 = "/webhook-example-not-present"; //example
const webhookPermission = (app) => {
    app.use((req, res, next) => {
        //Add your webhook endpoint here
        if (req.path === exports.webhook_route_1 || req.path === exports.webhook_route_2) {
            // replace with your actual webhook endpoint
            express_1.default.raw({ type: "application/json" })(req, res, next);
        }
        else {
            next();
        }
    });
};
exports.webhookPermission = webhookPermission;
