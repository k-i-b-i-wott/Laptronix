import * as productServices from "../service/products.services";
import { Request, Response } from "express";

export const getAllProductsController = async (req: Request, res: Response) => {
   try {
    const products = await productServices.getAllProductsService();
    res.status(200).json(products);
   } catch (error) {
    res.status(500).json({ message: "Internal server error" });
   }
}

