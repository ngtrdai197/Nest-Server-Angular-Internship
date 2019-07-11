import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interface';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto';
import { IProductService } from '../interfaces/IProduct.service';

@Injectable()
export class ProductService implements IProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async create(product: CreateProductDto): Promise<Product> {
        return await this.productModel.create(product);
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async findOne(query: any): Promise<Product> {
        return await this.productModel.findOne(query);
    }

    async findByCategory(query: any): Promise<Product[]> {
        return await this.productModel.find(query);
    }

    async update(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(createProductDto._id, createProductDto);
    }

    async delete(id: string): Promise<any> {
        return await this.productModel.deleteOne({ _id: id });
    }
}
