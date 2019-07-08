import { Document } from "mongoose";
import { Order } from "src/order/interface";

export interface User extends Document {
    readonly id?: string;
    readonly username?: string;
    readonly password?: string;
    readonly fullName?: string;
    readonly phone?: string;
    readonly email?: string;
    readonly role?: string;
    readonly address?: string;
    readonly orderDetails?: string | Order;
}