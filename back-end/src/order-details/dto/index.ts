import { CreateUserDto } from "src/user/dto";
import { CreateProductDto } from "src/product/dto";
import { CreateOrderDto } from "src/order/dto";

export interface CreateOrderDetailsDto {
    readonly id?: string;
    readonly product?: string | CreateProductDto;
    readonly order?: string | CreateOrderDto;
    readonly user?: string | CreateUserDto;
    readonly quantity?: number;
}