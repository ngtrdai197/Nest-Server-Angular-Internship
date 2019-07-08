import { Document } from "mongoose";
import { Product } from "src/product/interface";

export interface Category extends Document {
    readonly id?: string;
    readonly categoryName?: string;
    readonly products?: string[] | Product[];
}