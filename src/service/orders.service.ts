import * as ordersRepository from "../repository/orders.repository";

export const fetchAllOrders = async () => {
    const orders = await ordersRepository.getAllOrders();
    return orders;
};
export const fetchOrderById = async (orderId: number) => {
    const order = await ordersRepository.getOrderById(orderId);
    return order;
};

export const addNewOrder = async (orderData: any) => {
    const newOrder = await ordersRepository.createOrder(orderData);
    return newOrder;
};
