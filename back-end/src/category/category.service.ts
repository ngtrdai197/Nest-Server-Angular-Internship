import { Injectable } from '@nestjs/common';
import { ICategoryService } from '../interfaces/ICategory.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interface';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService implements ICategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async create(category: CreateCategoryDto): Promise<Category> {
        return await this.categoryModel.create(category);
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryModel.find();
    }
}
