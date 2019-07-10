import { CreateCategoryDto } from "../category/dto";
import { Category } from "../category/interface";

export abstract class ICategoryService {
    abstract create(category: CreateCategoryDto): Promise<Category>;
    abstract findAll(): Promise<Category[]>;
    abstract findOne(query: any): Promise<Category>;
    abstract update(createCategoryDto: CreateCategoryDto): Promise<Category>;
    abstract updateMapping(query: any, id: string): Promise<Category>;
    abstract delete(id: string): Promise<any>;
}