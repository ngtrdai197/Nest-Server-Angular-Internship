import { controller, httpGet, httpPost, httpDelete, httpPut, requestParam } from "inversify-express-utils";
import { IProduct } from "../entities";
import { inject } from "inversify";
import { TYPES } from "../common";
import { IProductRepository, ICategoryRepository } from "../IRepositories";
import { Request } from "express";

@controller("/product")
export class Product {
    constructor(
        @inject(TYPES.IProductRepository) private productRepo: IProductRepository,
        @inject(TYPES.ICategoryRepository) private categoryRepo: ICategoryRepository
    ) { }

    @httpGet('/')
    public async findAll(): Promise<IProduct[]> {
        try {
            return await this.productRepo.findAll({});
        } catch (error) {
            throw error;
        }
    }

    @httpGet(':/id')
    public async findOne(@requestParam('id') id: string) {
        return await this.productRepo.findOne({ _id: id });
    }

    @httpGet("/category/:id")
    public async findByCategory(@requestParam('id') id: string): Promise<IProduct[]> {
        try {
            return await this.productRepo.findAll({ category: id });
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/")
    public async create(req: Request): Promise<IProduct> {
        try {
            const { body } = req;
            const product = await this.productRepo.create(body);
            const query = { $push: { products: product } };
            await this.categoryRepo.updateMapping(query, product.category as string);
            return product;
        } catch (error) {
            throw error;
        }
    }

    @httpPut("/")
    public async update(req: Request): Promise<IProduct> {
        try {
            const { body } = req;
            return await this.productRepo.update(body);
        } catch (error) {
            throw error;
        }
    }

    @httpDelete('/:id')
    public async delete(req: Request): Promise<any> {
        try {
            const { id } = req.params;
            const product = await this.productRepo.findOne({ _id: id });
            if (product) {
                const query = { $pull: { products: { $in: id } } };
                await this.categoryRepo.updateMapping(query, product.category as string);
            }
            return await this.productRepo.delete(id);
        } catch (error) {
            throw error;
        }
    }
}