import { Document } from "mongoose";
import { Category } from "src/category/interface";
import { User } from "src/user/interface";

export interface Product extends Document {
    readonly id?: string;
    readonly productName?: string;
    readonly title?: string;
    readonly description?: string;
    readonly currentPrice?: number
    readonly oldPrice?: number;
    readonly discount?: number;
    readonly images?: string[];
    readonly category?: string | Category;
    readonly productTotal?: number;
    readonly productAvailable?: number;
    readonly ratings?: number; // ratings
    readonly productBoughtBy?: Customer;
}

export interface Customer {
    customer?: string | User;
    boughtAtDate?: Date;
}