import * as mongoose from "mongoose";
import { ICategory } from "./index";

export interface IProduct {
    id?: string;
    productName?: string;
    title?: string;
    description?: string;
    currentPrice?: number
    oldPrice?: number;
    discount?: number
    images?: string[];
    category?: string | ICategory;
}

export interface IProductModel extends IProduct, mongoose.Document {
    id: string;
}

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        currentPrice: {
            type: Number,
            required: true
        },
        description: String,
        oldPrice: Number,
        discount: Number,
        images: [{
            type: String
        }],
        category: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Category',
            required: true
        }
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);
productSchema.virtual("id").get(function (this: any) {
    return this._id.toHexString();
});

export const productModel = mongoose.model<IProductModel>("product", productSchema);
