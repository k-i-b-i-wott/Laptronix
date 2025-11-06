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

export const getProductByIdController = async (req: Request, res: Response) => {
      const productId = parseInt(req.params.id);
      try {
          const product = await productServices.getProductByIdService(productId);
          if (product) {
              res.status(200).json(product);
          } else {
              res.status(404).json({ message: "Product not found" });
          }
      } catch (error: any) {
          res.status(500).json({ message: "Internal server error", errorMessage: error.message });
      }
}

export const createProductController = async (req: Request, res: Response) => {
   const product = req.body;
      try {
            const result = await productServices.createProductService(product);
            res.status(201).json(result);
      } catch (error:any) {
            res.status(500).json({ message: "Internal server error", errorMessage: error.message });         
      }
}

export const deleteProductController = async (req: Request, res: Response) => {
      const productId = parseInt(req.params.id);
      try {
         const result = await productServices.deleteProductService(productId);
         res.status(200).json(result);
      } catch (error:any) {
         if (error.message === "Product not found") {
            res.status(404).json({ error: error.message });
         } else if (error.message === "Invalid product ID") {
            res.status(400).json({ error: error.message });
         } else { 
            res.status(500).json({ message: "Internal server error", errorMessage: error.message });
         }         
      }
}
export const updateProductController = async (req: Request, res: Response) => {
      const productId = parseInt(req.params.id);
      const updatedProduct = req.body;
      try {
         const result = await productServices.updateProductService(productId, updatedProduct);
         res.status(200).json(result);         
      } catch (error:any) {
         if (error.message === "Product not found") {
            res.status(404).json({ error: error.message });
         } else if (error.message === "Invalid product ID") {
            res.status(400).json({ error: error.message });
         } else { 
            res.status(500).json({ message: "Internal server error", errorMessage: error.message });
         }         
      }
}

   