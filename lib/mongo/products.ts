import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from ".";
import { Product } from "@/model/product";

let client: MongoClient;
let db: Db;
let products: Collection<Product>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarket")
        products = db.collection('products')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}

export async function getProductByBarcode (barcode: string) {
    try {
        
        return await products.findOne({barcode})
        
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}