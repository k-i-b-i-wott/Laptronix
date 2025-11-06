import * as productsRepositories from "../repository/products.repositories";
import { Product } from "../types/product.types";

export const getAllProductsService = async ()=>{
    const products = await productsRepositories.getAllProducts();
    return products;
}

export const getProductByIdService = async (productId: number)=>{
    const product = await productsRepositories.getProductById(productId);
    return product;
}

export const createProductService = async (newProduct: Product)=>{
    const result = await productsRepositories.createProduct(newProduct);
    return result;
}

export const deleteProductService = async (productId: number)=>{

    if (!productId || isNaN(productId)) {
        throw new Error("Invalid product ID");
    }
    const checkProduct = await productsRepositories.getProductById(productId);
    if(!checkProduct){
        throw new Error("Product not found");
    }
    const result = await productsRepositories.deleteProduct(productId);
    return result;
}

export const updateProductService = async (productId: number, updatedProduct: Product)=>{
    if (!productId || isNaN(productId)) {
        throw new Error("Invalid product ID");
    }
    const checkProduct = await productsRepositories.getProductById(productId);
    if(!checkProduct){
        throw new Error("Product not found");
    }
    const updatedFields = { ...checkProduct, ...updatedProduct };
    const result = await productsRepositories.updateProduct(productId, updatedFields);
    return result;
}