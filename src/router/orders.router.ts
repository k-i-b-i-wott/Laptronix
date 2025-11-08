import * as ordersController from "../controller/orders.controller";
import { Router } from "express";

export const ordersRoutes = (app: any) => {
    app.get("/orders", ordersController.getAllOrders);
    app.get("/orders/:id", ordersController.getOrderById);
    app.post("/orders", ordersController.createOrder);
    app.patch("/orders/:id", ordersController.updateOrderStatus);
    app.delete("/orders/:id", ordersController.deleteOrder);
};

