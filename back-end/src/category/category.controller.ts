import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';
import { Category } from './interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guard/roles.guard';
import { UserRole } from '../user/interface';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async create(@Body() category: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.create(category);
    }

    @Get('')
    @SetMetadata('roles', [UserRole.Admin, UserRole.User])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async findAll(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @Get('/find/:id')
    @SetMetadata('roles', [UserRole.Admin, UserRole.User])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async findOne(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.findOneAndPopulate(id);
    }

    @Get("query")
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async categoryTypes(): Promise<any> {
        try {
            const data = await this.categoryService.findAll();
            let pants: Category[] = [];
            let shirts: Category[] = [];
            data.filter(async x => {
                if ((x.categoryName as string).toLocaleLowerCase().includes('quần')) {
                    await pants.push(x);
                } else {
                    await shirts.push(x);
                }
            })
            return Promise.resolve({ pants, shirts });
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async update(@Body() category: CreateCategoryDto): Promise<Category> {
        return await this.categoryService.update(category);
    }

    @Delete('/delete/:id')
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async delete(@Param('id') id: string): Promise<any> {
        return await this.categoryService.delete(id);
    }

}
