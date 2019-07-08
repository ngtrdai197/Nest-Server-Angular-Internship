import { CreateProductDto } from "src/product/dto";

export interface CreateCategoryDto {
    readonly id?: string;
    readonly categoryName?: string;
    readonly products?: string[] | CreateProductDto[];
}