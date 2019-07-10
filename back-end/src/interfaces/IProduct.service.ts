import { CreateProductDto } from "../product/dto";
import { Product } from "../product/interface";

export abstract class IProductService {
    abstract create(product: CreateProductDto): Promise<Product>;
    abstract findAll(): Promise<Product[]>;
    abstract findOne(query: any): Promise<Product>;
    abstract update(createProductDto: CreateProductDto): Promise<Product>;
    abstract delete(id: string): Promise<any>;
}