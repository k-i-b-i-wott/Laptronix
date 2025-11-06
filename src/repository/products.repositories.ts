import { getPool } from "../db/config";
import { Product } from "../types/product.types";



export const getAllProducts = async ()=>{
    const pool = await getPool();
    const results = await pool.request().query("SELECT * FROM Products")
    return results.recordset
}

export const getProductById = async (productId: number)=>{
    const pool = await getPool();
    const results = await pool.request()
    .input("productId", productId)
    .query("SELECT * FROM Products WHERE productId = @productId")
    return results.recordset[0]
}

export const createProduct = async(newProduct:Product)=>{
    const pool = await getPool();
     await pool.request()   
    .input("productName", newProduct.productName)
    .input("productBrand", newProduct.productBrand)
    .input("productImage", newProduct.productImage)
    .input("stockQuantity", newProduct.stockQuantity)
    .input("productDescription", newProduct.productDescription)
    .input("productCategory", newProduct.productCategory)
    .input("productPrice", newProduct.productPrice)
    .query("INSERT INTO Products(productName, productBrand, productImage, stockQuantity, productDescription, productCategory, productPrice) VALUES (@productName, @productBrand, @productImage, @stockQuantity, @productDescription, @productCategory, @productPrice)");
    return { message: "Product created successfully" };
}

export const deleteProduct = async(productId: number)=>{
    const pool = await getPool();
     await pool.request()   
    .input("productId", productId)
    .query("DELETE FROM Products WHERE productId = @productId");
    return { message: "Product deleted successfully" };
}

export const updateProduct = async(productId: number, updatedProduct: Product)=>{
    const pool = await getPool();
     await pool.request()   
    .input("productId", productId)
    .input("productName", updatedProduct.productName)
    .input("productBrand", updatedProduct.productBrand)
    .input("productImage", updatedProduct.productImage)
    .input("stockQuantity", updatedProduct.stockQuantity)
    .input("productDescription", updatedProduct.productDescription)
    .input("productCategory", updatedProduct.productCategory)
    .input("productPrice", updatedProduct.productPrice)
    .query("UPDATE Products SET productName = @productName, productBrand = @productBrand, productImage = @productImage, stockQuantity = @stockQuantity, productDescription = @productDescription, productCategory = @productCategory, productPrice = @productPrice WHERE productId = @productId");
    return { message: "Product updated successfully" };
};