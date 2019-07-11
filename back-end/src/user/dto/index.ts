import { CreateOrderDetailsDto } from "src/order-details/dto";

export interface CreateUserDto {
    readonly _id?: string;
    readonly username?: string;
    readonly password?: string;
    readonly fullName?: string;
    readonly phone?: string;
    readonly email?: string;
    readonly role?: string;
    readonly avatar?: string;
    readonly address?: string;
    readonly orderDetails?: string | CreateOrderDetailsDto;
}