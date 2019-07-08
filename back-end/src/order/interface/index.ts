import { OrderDetails } from "src/order-details/interface";
import { Document } from "mongoose";

export interface Order extends Document {
    readonly id?: string;
    readonly createdDate?: string | Date;
    readonly payments?: string;
    readonly total?: number;
    readonly statePayment?: boolean;
    readonly orderDetails?: string | OrderDetails;
}