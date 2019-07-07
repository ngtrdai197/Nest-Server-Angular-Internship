import { inject } from "inversify";
import { TYPES } from "../common";
import { ICategoryRepository } from "../IRepositories";
import { httpGet, controller, httpPost, httpPut, httpDelete } from "inversify-express-utils";
import { ICategory } from "../entities";
import { Request } from "express";

@controller("/category")
export class Category {
    constructor(@inject(TYPES.ICategoryRepository) private categoryRespository: ICategoryRepository) { }

    @httpGet("/")
    public async findAll(): Promise<ICategory[]> {
        try {
            return await this.categoryRespository.findAll();
        } catch (error) {
            throw error;
        }
    }

    @httpPost("/")
    public async create(req: Request): Promise<ICategory> {
        try {
            const { body } = req;
            return await this.categoryRespository.create(body);
        } catch (error) {
            throw error;
        }
    }

    @httpPut("/")
    public async update(req: Request): Promise<ICategory> {
        try {
            const { body } = req;
            return await this.categoryRespository.update(body);
        } catch (error) {
            throw error;
        }
    }

    @httpDelete("/:id")
    public async delete(req: Request): Promise<any> {
        try {
            const { id } = req.params;
            return await this.categoryRespository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    @httpGet("/query")
    public async categoryTypes(req: Request): Promise<any> {
        try {
            const data = await this.categoryRespository.findAll();
            let pants: ICategory[] = [];
            let shirts: ICategory[] = [];
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
}
