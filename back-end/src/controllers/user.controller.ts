import { controller, httpGet, httpPost, httpPut, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";
import { Request } from "express";
import { SERVTYPES } from "../common";
import { IUser } from "../entities";
import { UserService } from "../services";
import { parser } from "../middleware";


@controller("/user")
export class UserController {
  constructor(
    @inject(SERVTYPES.IUserService) private userService: UserService
  ) { }

  @httpGet("/", parser(['admin']))
  public async findAll(): Promise<IUser[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @httpGet("/:id")
  public async findOne(req: Request): Promise<IUser> {
    try {
      const query = { _id: req.params.id };
      return await this.userService.findOne(query);
    } catch (error) {
      throw error;
    }
  }

  @httpPost("/")
  public async create(req: Request): Promise<IUser> {
    try {
      return await this.userService.create(req.body);
    } catch (error) {
      throw error;
    }
  }

  @httpPut("/")
  public async update(req: Request): Promise<IUser> {
    try {
      return await this.userService.update(req.body);
    } catch (error) {
      throw error;
    }
  }

  @httpDelete("/:id")
  public async delete(req: Request): Promise<any> {
    try {
      return await this.userService.delete(req.params.id);
    } catch (error) {
      throw error;
    }
  }
}
