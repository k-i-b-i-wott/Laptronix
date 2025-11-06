import * as productsRepositories from "../repository/products.repositories";

export const getAllProductsService = async ()=>{
    const products = await productsRepositories.getAllProducts();
    return products;
}