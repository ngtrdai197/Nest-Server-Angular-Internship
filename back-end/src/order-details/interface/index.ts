import { Document } from "mongoose";

export interface OrderDetails extends Document {
    readonly id?: string;
    readonly product?: string;
    readonly order?: string;
    readonly user?: string;
    readonly quantity?: number;
}