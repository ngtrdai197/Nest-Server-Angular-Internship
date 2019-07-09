import { CreateCategoryDto } from "../category/dto";
import { User } from "../user/interface";

export abstract class IUserService {
    abstract create(user: CreateCategoryDto): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract findOne(query: any): Promise<User>;
    abstract delete(query: any): Promise<any>;
}