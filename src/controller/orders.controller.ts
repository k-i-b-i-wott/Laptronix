import { Request, Response } from "express";
import * as ordersService from "../service/orders.service";

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await ordersService.fetchAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id);
    try {
        const order = await ordersService.fetchOrderById(orderId);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const createOrder = async (req: Request, res: Response) => {
    const orderData = req.body;
     try {        
        const newOrder = await ordersService.addNewOrder(orderData);
        res.status(201).json(newOrder);        
     } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
     }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;
    try {
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }
        const result = await ordersService.changeOrderStatus(orderId, status);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === "Order not found") {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.id);
    try {
        const result = await ordersService.removeOrder(orderId);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === "Order not found") {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(500).json({ message: "Internal server error", error });
    }
}