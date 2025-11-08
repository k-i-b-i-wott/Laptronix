import { getPool } from "../db/config";
import { Order } from "../types/orders.order";


export const getAllOrders = async ()=>{
    const pool = await getPool();
    const results = await pool.request().query("SELECT * FROM Orders")
    return results.recordset;
}

export const getOrderById = async (orderId: number) => {
    const pool = await getPool();
    const results = await pool.request()
        .input("OrderId", orderId)
        .query("SELECT * FROM Orders WHERE OrderId = @OrderId");
    return results.recordset[0];
}

export const createOrder = async (order: Order) => {
    const pool = await getPool();
     await pool.request()
        .input("UserId", order.userId)
        .input("ProductId", order.productId)
        .input("Quantity", order.quantity)
        .input("TotalAmount", order.totalAmount)        
        .query('INSERT INTO Orders (UserId, ProductId, Quantity, TotalAmount) VALUES (@UserId, @ProductId, @Quantity, @TotalAmount); SELECT SCOPE_IDENTITY() AS OrderId;');
    return {message:"Order created successfully"};
}
