import { IUserService } from "../interfaces/IServices";
import { injectable, inject } from "inversify";
import { REPOTYPES } from "../common";
import { UserRepository } from "../repositories";
import { IUser } from "../entities";

@injectable()
export class UserService implements IUserService {
    constructor(@inject(REPOTYPES.IUserRepository) private userRepository: UserRepository) { }

    create = async (user: IUser): Promise<IUser> => {
        return await this.userRepository.create(user);
    }

    findAll = async (): Promise<IUser[]> => {
        return this.userRepository.findAll();
    }

    findOne = async (query: any): Promise<IUser> => {
        return this.userRepository.findOne(query);
    }

    update = async (user: IUser): Promise<IUser> => {
        return await this.userRepository.update(user);
    };

    delete = async (id: string): Promise<any> => {
        return await this.userRepository.delete(id);
    }
}