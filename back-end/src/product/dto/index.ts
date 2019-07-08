import { CreateCategoryDto } from "dist/category/dto";
import { Customer } from "../interface";

export interface CreateProductDto {
    readonly id?: string;
    readonly productName?: string;
    readonly title?: string;
    readonly description?: string;
    readonly currentPrice?: number
    readonly oldPrice?: number;
    readonly discount?: number;
    readonly images?: string[];
    readonly category?: string | CreateCategoryDto;
    readonly productTotal?: number;
    readonly productAvailable?: number;
    readonly ratings?: number; // ratings
    readonly productBoughtBy?: Customer;
}