import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';
import { Category } from './interface';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async create(@Body() category: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.create(category);
    }

    @Get('')
    async findAll(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }
}
