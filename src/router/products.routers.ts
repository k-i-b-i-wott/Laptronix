import app from "..";
import * as productControllers from "../controller/products.controller";

export const productsRoutes = (app:any)=>{
    app.get("/products", productControllers.getAllProductsController);
}