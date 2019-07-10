import { Controller, Post, UseGuards, SetMetadata, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../user/interface';
import { RolesGuard } from '../common/guard/roles.guard';
import { CreateProductDto } from './dto';
import { Product } from './interface';
import { CategoryService } from '../category/category.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService, private readonly categoryService: CategoryService) { }

    @Post()
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async create(@Body() product: CreateProductDto): Promise<Product> {
        const created = await this.productService.create(product);
        const query = { $push: { products: created } };
        await this.categoryService.updateMapping(query, created.category as string);
        return created;
    }

    @Get('')
    @SetMetadata('roles', [UserRole.Admin, UserRole.User])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async findAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    @SetMetadata('roles', [UserRole.Admin, UserRole.User])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async findOne(@Param("id") id: string): Promise<Product> {
        const query = { _id: id };
        return await this.productService.findOne(query);
    }

    @Get('/category/:id')
    @SetMetadata('roles', [UserRole.Admin, UserRole.User])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async findByCategory(@Param("id") id: string): Promise<Product[]> {
        const query = { category: id };
        return await this.productService.findByCategory(query);
    }

    @Put()
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async update(@Body() product: CreateProductDto): Promise<Product> {
        return await this.productService.update(product);
    }

    @Delete(':id')
    @SetMetadata('roles', [UserRole.Admin])
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async delete(@Param('id') id: string): Promise<any> {
        const product = await this.productService.findOne({ _id: id });
        const query = { $pull: { products: { $in: id } } };
        await this.categoryService.updateMapping(query, product.category as string);
        return await this.productService.delete(id);
    }
}
