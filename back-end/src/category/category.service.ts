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

    async findOne(query: any): Promise<Category> {
        return await this.categoryModel.findOne(query);
    }

    async findOneAndPopulate(id: string): Promise<Category> {
        return await this.categoryModel.findOne({ _id: id }).populate('products');
    }

    async update(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return await this.categoryModel.findByIdAndUpdate(createCategoryDto.id, createCategoryDto);
    }

    async updateMapping(query: any, id: string): Promise<Category> {
        return await this.categoryModel.update({ _id: id }, query);
    }

    async delete(id: string): Promise<any> {
        return await this.categoryModel.deleteOne({ _id: id });
    }
}
