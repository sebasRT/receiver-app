export type Product = {
    _id: string; 
    barcode: string;
    searchString: string;
    name: string; 
    brand: string;
    measure: string; 
    description: string; 
    image: string;
    costPrice: number; 
    price: number;
    category: string; 
    subcategory: string;
    stockStatus: "low" | "out" | "available"
}