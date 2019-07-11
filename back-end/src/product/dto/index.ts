import { Customer } from "../interface";
import { CreateCategoryDto } from "src/category/dto";

export interface CreateProductDto {
    readonly _id?: string;
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