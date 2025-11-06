export interface Product {    
    productName : string;
    productBrand : string;
    productImage : string;
    stockQuantity : number;
    productDescription : string;
    productCategory : string;
    productPrice : number;
}

export interface productUpdate {     
    productName? : string;
    productBrand? : string;
    productImage? : string;
    stockQuantity? : number;
    productDescription? : string;
    productCategory? : string;
    productPrice? : number;
}

