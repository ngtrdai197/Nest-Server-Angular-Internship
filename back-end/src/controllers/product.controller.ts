import { controller, httpGet, httpPost, httpDelete, httpPut } from "inversify-express-utils";
import { IProduct } from "../entities";
import { inject } from "inversify";
import { TYPES } from "../common";
import { IProductRepository } from "../IRepositories";
import { Request } from "express";

@controller("/product")
export class Product {
    constructor(@inject(TYPES.IProductRepository) private productRepository: IProductRepository) { }

    @httpGet('/')
    public async findAll(): Promise<IProduct[]> {
        return await this.productRepository.findAll({});
    }

    @httpGet("/category/:id")
    public async findByCategory(req: Request): Promise<IProduct[]> {
        try {
            const { id } = req.params;
            return await this.productRepository.findAll({ category: id });
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/")
    public async create(req: Request): Promise<IProduct> {
        try {
            const { body } = req;
            return await this.productRepository.create(body);
        } catch (error) {
            throw error;
        }
    }

    @httpPut("/")
    public async update(req: Request): Promise<IProduct> {
        try {
            const { body } = req;
            return await this.productRepository.update(body);
        } catch (error) {
            throw error;
        }
    }

    @httpDelete('/:id')
    public async delete(req: Request): Promise<any> {
        const { id } = req.params;
        return await this.productRepository.delete(id);
    }
}