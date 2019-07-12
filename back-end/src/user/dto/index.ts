import { CreateOrderDetailsDto } from "src/order-details/dto";

export interface CreateUserDto {
    _id?: string;
    id?: string;
    username?: string;
    password?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    role?: string;
    avatar?: string;
    address?: string;
    orderDetails?: string | CreateOrderDetailsDto;
}