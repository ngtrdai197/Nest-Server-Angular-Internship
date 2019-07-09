import { CreateCategoryDto } from "../category/dto";
import { Category } from "../category/interface";

export abstract class ICategoryService {
    abstract create(category: CreateCategoryDto): Promise<Category>;
}