import app from "..";
import * as productControllers from "../controller/products.controller";

export const productsRoutes = (app:any)=>{
    app.get("/products", productControllers.getAllProductsController);
    app.get("/products/:id", productControllers.getProductByIdController);
    app.post("/products", productControllers.createProductController);
    app.delete("/products/:id", productControllers.deleteProductController);
}
