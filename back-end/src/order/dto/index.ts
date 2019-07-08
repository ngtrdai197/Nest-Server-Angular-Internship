import { CreateOrderDetailsDto } from "src/order-details/dto";

export interface CreateOrderDto {
    readonly id?: string;
    readonly createdDate?: string | Date;
    readonly payments?: string;
    readonly total?: number;
    readonly statePayment?: boolean;
    readonly orderDetails?: string | CreateOrderDetailsDto;
}